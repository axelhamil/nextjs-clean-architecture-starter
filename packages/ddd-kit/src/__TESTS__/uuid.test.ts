import { describe, expect, it } from "vitest";
import { UUID } from "../core/UUID";
import { StubId } from "./stubs/uuidStub";

describe("UUID", () => {
  describe("constructor", () => {
    it("should create a UUID with a random value when no value is provided", () => {
      const uuid = new UUID<string>();

      expect(uuid.value).toBeDefined();
      expect(typeof uuid.value).toBe("string");
      expect(uuid.value.length).toBeGreaterThan(0);
    });

    it("should create a UUID with the provided value", () => {
      const testValue = "test-uuid-123";
      const uuid = new UUID<string>(testValue);

      expect(uuid.value).toBe(testValue);
    });
  });

  describe("value getter", () => {
    it("should return the encapsulated value", () => {
      const testValue = "test-value";
      const uuid = new UUID<string>(testValue);

      expect(uuid.value).toBe(testValue);
    });
  });

  describe("create()", () => {
    it("should create a new UUID from another UUID", () => {
      const originalUuid = new UUID<string>("original-uuid");
      const newUuid = originalUuid.create(originalUuid);

      expect(newUuid).toBeInstanceOf(UUID);
      expect(newUuid.value).toBe(originalUuid.value);
      expect(newUuid).not.toBe(originalUuid);
    });
  });

  describe("equals()", () => {
    it("should return true when comparing equal UUIDs", () => {
      const value = "test-uuid";
      const uuid1 = new UUID<string>(value);
      const uuid2 = new UUID<string>(value);

      expect(uuid1.equals(uuid2)).toBe(true);
    });

    it("should return false when comparing different UUIDs", () => {
      const uuid1 = new UUID<string>("uuid-1");
      const uuid2 = new UUID<string>("uuid-2");

      expect(uuid1.equals(uuid2)).toBe(false);
    });

    it("should return false when comparing with null", () => {
      const uuid = new UUID<string>("test-uuid");

      // biome-ignore lint/suspicious/noExplicitAny: I need to test the equals method with null
      expect(uuid.equals(null as any)).toBe(false);
    });

    it("should return false when comparing with undefined", () => {
      const uuid = new UUID<string>("test-uuid");

      // biome-ignore lint/suspicious/noExplicitAny: I need to test the equals method with undefined
      expect(uuid.equals(undefined as any)).toBe(false);
    });
  });
});

describe("StubId", () => {
  describe("create()", () => {
    it("should create a StubId from a UUID", () => {
      const uuid = new UUID<string>("test-uuid");
      const stubId = StubId.create(uuid);

      expect(stubId).toBeInstanceOf(StubId);
      expect(stubId.value).toBe(uuid.value);
    });

    it("should create a StubId with random value when UUID is not provided", () => {
      const stubId = StubId.create(new UUID<string>());

      expect(stubId).toBeInstanceOf(StubId);
      expect(stubId.value).toBeDefined();
      expect(typeof stubId.value).toBe("string");
    });
  });

  describe("inheritance", () => {
    it("should inherit from UUID", () => {
      const uuid = new UUID<string>("test-uuid");
      const stubId = StubId.create(uuid);

      expect(stubId).toBeInstanceOf(UUID);
    });

    it("should have correct toStringTag", () => {
      const uuid = new UUID<string>("test-uuid");
      const stubId = StubId.create(uuid);

      expect(Object.prototype.toString.call(stubId)).toBe("[object StubId]");
    });
  });
});
