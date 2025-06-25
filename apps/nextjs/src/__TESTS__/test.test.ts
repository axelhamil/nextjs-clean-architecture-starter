import { describe, expect, it } from "vitest";

describe("Next.js Application", () => {
  describe("Basic Functionality", () => {
    it("should have a working test environment", () => {
      expect(process.env.NODE_ENV).toBeDefined();
      expect(typeof process.env.NODE_ENV).toBe("string");
    });

    it("should support async operations", async () => {
      const result = await Promise.resolve("test");
      expect(result).toBe("test");
    });
  });

  describe("TypeScript Support", () => {
    it("should handle type assertions correctly", () => {
      const value: unknown = "hello world";
      const typedValue = value as string;

      expect(typeof typedValue).toBe("string");
      expect(typedValue.length).toBeGreaterThan(0);
    });

    it("should work with interfaces", () => {
      interface TestData {
        id: number;
        name: string;
      }

      const data: TestData = { id: 1, name: "test" };

      expect(data.id).toBe(1);
      expect(data.name).toBe("test");
    });
  });

  describe("Array Operations", () => {
    it("should handle array methods", () => {
      const numbers = [1, 2, 3, 4, 5];
      const doubled = numbers.map((n) => n * 2);
      const filtered = doubled.filter((n) => n > 5);

      expect(doubled).toEqual([2, 4, 6, 8, 10]);
      expect(filtered).toEqual([6, 8, 10]);
    });

    it("should work with array destructuring", () => {
      const [first, second, ...rest] = [1, 2, 3, 4, 5];

      expect(first).toBe(1);
      expect(second).toBe(2);
      expect(rest).toEqual([3, 4, 5]);
    });
  });
});
