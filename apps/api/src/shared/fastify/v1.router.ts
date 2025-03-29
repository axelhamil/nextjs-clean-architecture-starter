import type { FastifyInstance } from "fastify";

// declare module "fastify" {
//   export interface FastifyRequest {
//     user: {
//       userId: string;
//       email: string;
//     };
//   }
// }

export const v1Router = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get("/health", async () => {
    return { status: "ok" };
  });
};
