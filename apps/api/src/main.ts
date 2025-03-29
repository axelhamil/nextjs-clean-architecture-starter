import { env } from "@shared/env";
import { fastify } from "@shared/fastify/config";

fastify.listen({ port: Number(env.PORT), host: "localhost" }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
