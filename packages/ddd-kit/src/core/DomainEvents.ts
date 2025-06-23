import { None, type Option, Some } from "./Option";
import { Result } from "./Result";

/**
 * Represents a domain event in the system.
 * Domain events capture something that happened in the domain that is important to the business.
 */
export interface DomainEvent {
  /**
   * The type or name of the event.
   */
  type: string;
  /**
   * The date and time when the event occurred.
   */
  dateTimeOccurred: Date;
  /**
   * The identifier of the aggregate associated with this event.
   */
  aggregateId: string;
}

/**
 * Enum for possible errors related to domain event handling.
 */
export enum DomainEventError {
  SUBSCRIPTION_FAILED = "SUBSCRIPTION_FAILED",
  REGISTRATION_FAILED = "REGISTRATION_FAILED",
  DISPATCH_FAILED = "DISPATCH_FAILED",
  HANDLER_FAILED = "HANDLER_FAILED",
  UNSUBSCRIPTION_FAILED = "UNSUBSCRIPTION_FAILED",
}

/**
 * Interface for event handler classes that handle domain events.
 * @template T The type of domain event handled.
 */
export interface IEventHandler<T extends DomainEvent> {
  /**
   * Handles the given domain event.
   * @param event The event to handle.
   * @returns A Result or Promise<Result> indicating success or failure.
   */
  handle(event: T): Promise<Result<void>> | Result<void>;
}

type EventHandler<T extends DomainEvent> = (
  event: T,
) => Promise<Result<void>> | Result<void>;

type EventHandlers<T extends DomainEvent = DomainEvent> = {
  [key: string]: EventHandler<T>[];
};

type Events = { [id: string]: DomainEvent[] };

export class DomainEvents {
  private static eventHandlers: EventHandlers = {};
  private static events: Events = {};
  private static enableLogging = true;

  // biome-ignore lint/complexity/noUselessConstructor: ByPassing the constructor
  constructor() {}

  public static setLogging(enabled: boolean): void {
    DomainEvents.enableLogging = enabled;
  }

  // biome-ignore lint/suspicious/noExplicitAny: Error is not typed
  private static log(message: string, error?: any): void {
    if (DomainEvents.enableLogging) {
      // biome-ignore lint/suspicious/noConsole: ByPassing the console
      console.error(message, error);
    }
  }

  public static subscribe<T extends DomainEvent>(
    eventType: string,
    listener: EventHandler<T>,
  ): Result<void> {
    try {
      if (!DomainEvents.eventHandlers[eventType]) {
        DomainEvents.eventHandlers[eventType] = [];
      }

      DomainEvents.eventHandlers[eventType].push(
        listener as EventHandler<DomainEvent>,
      );

      return Result.ok();
    } catch (_error) {
      return Result.fail(DomainEventError.SUBSCRIPTION_FAILED);
    }
  }

  public static unsubscribe(
    eventType: string,
    listener: EventHandler<DomainEvent>,
  ): Result<void> {
    try {
      const handlers = DomainEvents.eventHandlers[eventType];
      if (handlers) {
        const index = handlers.indexOf(listener);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      }
      return Result.ok();
    } catch (_error) {
      return Result.fail(DomainEventError.UNSUBSCRIPTION_FAILED);
    }
  }

  public static isSubscribed(eventType: string): boolean {
    const handlers = DomainEvents.eventHandlers[eventType];
    return handlers ? handlers.length > 0 : false;
  }

  public static registerEvent(
    entityId: string,
    event: DomainEvent,
  ): Result<void> {
    try {
      if (!DomainEvents.events[entityId]) {
        DomainEvents.events[entityId] = [];
      }

      DomainEvents.events[entityId].push(event);
      return Result.ok();
    } catch (_error) {
      return Result.fail(DomainEventError.REGISTRATION_FAILED);
    }
  }

  public static async dispatch(entityId: string): Promise<Result<void>> {
    try {
      const eventsForEntity = DomainEvents.events[entityId];

      if (!eventsForEntity || eventsForEntity.length === 0) {
        return Result.ok();
      }

      const dispatchPromises: Promise<Result<void>>[] = [];

      for (const event of eventsForEntity) {
        const listeners = DomainEvents.eventHandlers[event.type] || [];

        for (const listener of listeners) {
          const result = listener(event);

          if (result instanceof Promise) {
            dispatchPromises.push(result);
          } else {
            if (result.isFailure) {
              DomainEvents.log(`Event handler failed: ${result.getError()}`);
            }
          }
        }
      }

      if (dispatchPromises.length > 0) {
        const results = await Promise.allSettled(dispatchPromises);

        for (const result of results) {
          if (result.status === "rejected") {
            DomainEvents.log("Event handler promise rejected:", result.reason);
          } else if (result.value.isFailure) {
            DomainEvents.log("Event handler failed:", result.value.getError());
          }
        }
      }

      delete DomainEvents.events[entityId];

      return Result.ok();
    } catch (error) {
      return Result.fail(`${DomainEventError.DISPATCH_FAILED}: ${error}`);
    }
  }

  public static async dispatchAll(): Promise<Result<void>> {
    try {
      const entityIds = Object.keys(DomainEvents.events);
      const dispatchPromises = entityIds.map((id) => DomainEvents.dispatch(id));

      await Promise.allSettled(dispatchPromises);

      return Result.ok();
    } catch (error) {
      return Result.fail(`${DomainEventError.DISPATCH_FAILED}: ${error}`);
    }
  }

  public static getEventsForEntity(entityId: string): Option<DomainEvent[]> {
    const events = DomainEvents.events[entityId];
    return events ? Some.of(events) : None.of<DomainEvent[]>();
  }

  public static clearEvents(): void {
    DomainEvents.events = {};
  }

  public static clearHandlers(): void {
    DomainEvents.eventHandlers = {};
  }

  public static getHandlerCount(eventType: string): number {
    const handlers = DomainEvents.eventHandlers[eventType];
    return handlers ? handlers.length : 0;
  }

  public static hasEvents(entityId: string): boolean {
    const events = DomainEvents.events[entityId];
    return events ? events.length > 0 : false;
  }

  public static getTotalEventCount(): number {
    return Object.values(DomainEvents.events).reduce(
      (total, events) => total + events.length,
      0,
    );
  }
}
