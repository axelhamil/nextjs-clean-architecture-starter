import { Result } from "../../core/Result";
import { ValueObject } from "../../core/ValueObject";

export class StringStubs extends ValueObject<string> {
  protected validate(value: string): Result<string> {
    if (!value || value.trim().length === 0) {
      return Result.fail("Value cannot be empty");
    }
    if (value.length > 10) {
      return Result.fail("Value cannot exceed 10 characters");
    }
    return Result.ok(value);
  }
}
