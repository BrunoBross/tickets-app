import { FastifyInstance } from "fastify";
import { UserController } from "./controllers/UserController";

export async function Routes(app: FastifyInstance) {
  app.get("/", (request, response) => {
    response.send("API for Tickets App");
  });

  app.register(UserController);
}
