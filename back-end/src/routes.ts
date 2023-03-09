import { FastifyInstance } from "fastify";
import { EventController } from "./controllers/EventController";
import { OrganizerController } from "./controllers/OrganizerController";
import { TicketController } from "./controllers/TicketController";
import { TicketTypeController } from "./controllers/TicketTypeController";
import { UserController } from "./controllers/UserController";

export async function Routes(app: FastifyInstance) {
  app.get("/", (request, response) => {
    response.send("API for Tickets App");
  });

  app.register(UserController);

  app.register(OrganizerController);

  app.register(EventController);

  app.register(TicketTypeController);

  app.register(TicketController);
}
