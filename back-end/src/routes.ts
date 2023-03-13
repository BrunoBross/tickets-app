import { FastifyInstance } from "fastify";
import { AuthController } from "./controllers/AuthController";
import { EventController } from "./controllers/EventController";
import { OrganizerController } from "./controllers/OrganizerController";
import { TicketController } from "./controllers/TicketController";
import { TicketTypeController } from "./controllers/TicketTypeController";
import { UserController } from "./controllers/UserController";

export async function Routes(app: FastifyInstance) {
  app.get("/", (request, response) => {
    response.send("API for Tickets App");
  });

  // decorator de autenticacao
  app.decorate("authenticate", async (request: any, response: any) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      console.log(error);
      response.code(401).send({ error: "Authentication failed" });
    }
  });

  app.register(AuthController);

  app.register(UserController);

  app.register(OrganizerController);

  app.register(EventController);

  app.register(TicketTypeController);

  app.register(TicketController);
}
