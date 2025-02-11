import cors from "@fastify/cors";
import { env } from "@shared/env";
import Fastify from "fastify";
import { v1Router } from "./v1.router";

const loggerConfig = {
  development: {
    transport: {
      options: {
        ignore: "pid,hostname",
        translateTime: "HH:MM:ss Z",
      },
      target: "pino-pretty",
    },
  },
  production: true,
  test: true,
};

export const fastify = Fastify({
  ajv: {
    customOptions: {
      keywords: ["example"],
      strict: "log",
    },
  },
  logger: loggerConfig[env.NODE_ENV as keyof typeof loggerConfig],
  disableRequestLogging: true,
});

fastify.register(cors, {
  origin: env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Authorization", "Content-Type"],
});

fastify.register(v1Router, { prefix: "/v1" });

fastify.addHook("onResponse", (request, reply, done) => {
  request.log.info(
    `${request.method} ${request.url} ${reply.statusCode} ${reply.elapsedTime}ms`,
    "Request completed",
  );
  done();
});
