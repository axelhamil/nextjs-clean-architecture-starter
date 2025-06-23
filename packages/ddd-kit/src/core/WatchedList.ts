import { Entity } from "./Entity";
import { None, type Option, Some } from "./Option";
import { Result } from "./Result";
import { UUID } from "./UUID";
import { ValueObject } from "./ValueObject";

/**
 * Abstract base class for a watched list of items.
 * Used to track changes (additions/removals) to a collection of items in aggregates.
 * @template T The type of items in the list.
 */
export abstract class WatchedList<T> {
  private currentItems: T[];
  private initial: T[];
  private new: T[];
  private removed: T[];

  /**
   * Creates a new WatchedList instance.
   * @param initialItems Optional initial items for the list.
   */
  protected constructor(initialItems?: T[]) {
    this.currentItems = initialItems ?? [];
    this.initial = initialItems ?? [];
    this.new = [];
    this.removed = [];
  }

  /**
   * Compares two items for equality.
   * @param a The first item.
   * @param b The second item.
   * @returns True if the items are equal, false otherwise.
   */
  abstract compareItems(a: T, b: T): boolean;

  /**
   * Returns a copy of the current items in the list.
   */
  public getItems(): T[] {
    return [...this.currentItems];
  }

  /**
   * Returns a copy of the new items added to the list.
   */
  public getNewItems(): T[] {
    return [...this.new];
  }

  /**
   * Returns a copy of the items removed from the list.
   */
  public getRemovedItems(): T[] {
    return [...this.removed];
  }

  /**
   * Checks if there are any changes (additions or removals) in the list.
   * @returns True if there are changes, false otherwise.
   */
  public hasChanges(): boolean {
    return this.new.length > 0 || this.removed.length > 0;
  }

  /**
   * Adds an item to the list.
   * @param item The item to add.
   * @returns A Result indicating success or failure.
   */
  public add(item: T): Result<void> {
    if (this.isRemovedItem(item)) this.removeFromRemoved(item);

    if (!this.isNewItem(item) && !this.wasAddedInitially(item))
      this.new.push(item);

    if (!this.isCurrentItem(item)) this.currentItems.push(item);

    return Result.ok();
  }

  /**
   * Removes an item from the list.
   * @param item The item to remove.
   * @returns A Result indicating success or failure.
   */
  public remove(item: T): Result<void> {
    this.removeFromCurrent(item);

    if (this.isNewItem(item)) {
      this.removeFromNew(item);
      return Result.ok();
    }

    if (!this.isRemovedItem(item)) this.removed.push(item);

    return Result.ok();
  }

  /**
   * Finds an item in the list matching the given predicate.
   * @param predicate The function to test each item.
   * @returns An Option containing the found item or None.
   */
  public find(predicate: (item: T) => boolean): Option<T> {
    const item = this.currentItems.find(predicate);
    return item ? Some.of(item) : None.of<T>();
  }

  /**
   * Checks if an item exists in the current list.
   * @param item The item to check.
   * @returns True if the item exists, false otherwise.
   */
  public exists(item: T): boolean {
    return this.isCurrentItem(item);
  }

  /**
   * Returns the number of items in the current list.
   */
  public count(): number {
    return this.currentItems.length;
  }

  /**
   * Maps the current items to plain objects or values.
   * @returns An array of plain objects or values.
   */
  public mapToObject(): unknown[] {
    return this.currentItems.map((item) => {
      if (item instanceof ValueObject || item instanceof UUID)
        return item.value;

      if (item instanceof Entity) return item.toObject();

      return item;
    });
  }

  private isCurrentItem(item: T): boolean {
    return this.currentItems.some((v) => this.compareItems(item, v));
  }

  private isNewItem(item: T): boolean {
    return this.new.some((v) => this.compareItems(item, v));
  }

  private isRemovedItem(item: T): boolean {
    return this.removed.some((v) => this.compareItems(item, v));
  }

  private wasAddedInitially(item: T): boolean {
    return this.initial.some((v) => this.compareItems(item, v));
  }

  private removeFromNew(item: T): void {
    this.new = this.new.filter((v) => !this.compareItems(v, item));
  }

  private removeFromCurrent(item: T): void {
    this.currentItems = this.currentItems.filter(
      (v) => !this.compareItems(item, v),
    );
  }

  private removeFromRemoved(item: T): void {
    this.removed = this.removed.filter((v) => !this.compareItems(v, item));
  }
}
