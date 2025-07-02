import { UUID } from "../../core/UUID";

export class StubId extends UUID<string> {
  protected [Symbol.toStringTag] = "StubId";

  private constructor(id: UUID<string>) {
    super(id ? id.value : new UUID<string>().value);
  }
  public static create(id: UUID<string>): StubId {
    return new StubId(id);
  }
}
