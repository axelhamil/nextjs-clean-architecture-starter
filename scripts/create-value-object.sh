#!/bin/bash

NAME=$1
if [ -z "$NAME" ]; then
  echo "Usage: ./scripts/create-value-object.sh <ValueObjectName>"
  echo "Example: ./scripts/create-value-object.sh Email"
  exit 1
fi

TARGET_DIR="apps/nextjs/src/domain"
FILE_PATH="${TARGET_DIR}/${NAME}.value-object.ts"

mkdir -p "$TARGET_DIR"

cat > "$FILE_PATH" <<EOF
import { Result, ValueObject } from "@packages/ddd-kit";

interface ${NAME}Props {
  value: string;
  // TODO: Add additional properties if needed
}

export class ${NAME} extends ValueObject<${NAME}Props> {
  protected validate(props: ${NAME}Props): Result<${NAME}Props> {
    // TODO: Add validation logic
    if (!props.value) {
      return Result.fail("${NAME} cannot be empty");
    }

    // Example: Add more validation
    // if (props.value.length < 3) {
    //   return Result.fail("${NAME} must be at least 3 characters");
    // }

    return Result.ok(props);
  }

  get value(): string {
    return this.props.value;
  }

  // TODO: Add domain methods if needed
  // public isSomething(): boolean {
  //   return this.props.value === "something";
  // }
}
EOF

echo "✅ Value object created: ${FILE_PATH}"
echo ""
echo "Next steps:"
echo "1. Update the ${NAME}Props interface with your properties"
echo "2. Implement validation logic in validate()"
echo "3. Add domain methods if needed"
