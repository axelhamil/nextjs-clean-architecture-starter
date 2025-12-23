#!/bin/bash

NAME=$1
if [ -z "$NAME" ]; then
  echo "Usage: ./scripts/create-use-case.sh <UseCaseName>"
  echo "Example: ./scripts/create-use-case.sh CreateUser"
  exit 1
fi

TARGET_DIR="apps/nextjs/src/application"
FILE_PATH="${TARGET_DIR}/${NAME}.use-case.ts"

mkdir -p "$TARGET_DIR"

cat > "$FILE_PATH" <<EOF
import { Result, UseCase } from "@packages/ddd-kit";

interface ${NAME}Input {
  // TODO: Define input properties
}

interface ${NAME}Output {
  // TODO: Define output properties
}

export class ${NAME}UseCase implements UseCase<${NAME}Input, ${NAME}Output> {
  constructor(
    // TODO: Inject dependencies (repositories, services)
  ) {}

  async execute(input: ${NAME}Input): Promise<Result<${NAME}Output>> {
    // 1. Validate input
    // TODO: Add input validation

    // 2. Execute business logic
    // TODO: Implement use case logic

    // 3. Return result
    return Result.ok({} as ${NAME}Output);
  }
}
EOF

echo "✅ Use case created: ${FILE_PATH}"
echo ""
echo "Next steps:"
echo "1. Define the Input and Output interfaces"
echo "2. Inject required dependencies in constructor"
echo "3. Implement the business logic in execute()"
