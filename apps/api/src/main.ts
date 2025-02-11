import { db, users } from "@packages/drizzle";
import { env } from "@shared/env";
import { fastify } from "@shared/fastify/config";

fastify.get("/", async (_req, res) => {
  const result = await db.query.users.findFirst();

  if (!result) {
    const [newUser] = await db
      .insert(users)
      .values({
        email: "test@test.com",
        name: "Test",
      })
      .returning();

    return res.status(200).send(newUser);
  }

  res.status(200).send(result);
});

fastify.listen({ port: Number(env.PORT), host: "localhost" }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
