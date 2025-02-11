import type { FastifyInstance } from "fastify";

// declare module "fastify" {
//   export interface FastifyRequest {
//     user: {
//       clientId: string;
//       userId: string;
//     };
//   }
// }

export const v1Router = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get("/health", async () => {
    return { status: "ok" };
  });
};
