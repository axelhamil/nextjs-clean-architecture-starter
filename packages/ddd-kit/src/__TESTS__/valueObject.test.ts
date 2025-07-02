import { describe, expect, it } from "vitest";
import { StringStubs } from "./stubs/stringStub-vo";

describe("ValueObject", () => {
  describe("create()", () => {
    it("should create a valid value object when value is valid", () => {
      const testValue: string = "test";
      const result = StringStubs.create(testValue);

      expect(result.isSuccess).toBe(true);
      expect(result.getValue().value).toBe("test");
    });

    it("should fail when value is empty", () => {
      const emptyValue: string = "";
      const result = StringStubs.create(emptyValue);

      expect(result.isFailure).toBe(true);
      expect(result.getError()).toBe("Value cannot be empty");
    });

    it("should fail when value is only whitespace", () => {
      const whitespaceValue: string = "   ";
      const result = StringStubs.create(whitespaceValue);

      expect(result.isFailure).toBe(true);
      expect(result.getError()).toBe("Value cannot be empty");
    });

    it("should fail when value exceeds 10 characters", () => {
      const longValue: string = "this is too long";
      const result = StringStubs.create(longValue);

      expect(result.isFailure).toBe(true);
      expect(result.getError()).toBe("Value cannot exceed 10 characters");
    });
  });

  describe("equals()", () => {
    it("should return true when comparing equal value objects", () => {
      const value: string = "test";
      const valueObj1 = StringStubs.create(value).getValue();
      const valueObj2 = StringStubs.create(value).getValue();

      expect(valueObj1.equals(valueObj2)).toBe(true);
    });

    it("should return false when comparing different value objects", () => {
      const value1: string = "test1";
      const value2: string = "test2";
      const valueObj1 = StringStubs.create(value1).getValue();
      const valueObj2 = StringStubs.create(value2).getValue();

      // biome-ignore lint/suspicious/noExplicitAny: I need to access the private property
      expect(valueObj1.equals(valueObj2 as any)).toBe(false);
    });
  });

  describe("value getter", () => {
    it("should return the encapsulated value", () => {
      const testValue: string = "test";
      const valueObj = StringStubs.create(testValue).getValue();

      expect(valueObj.value).toBe("test");
    });
  });
});
