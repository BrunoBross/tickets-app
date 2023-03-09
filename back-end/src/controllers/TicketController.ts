import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function TicketController(app: FastifyInstance) {
  // get tickets
  app.get("/ticket", async (request, response) => {
    await prisma.ticket
      .findMany()
      .then((tickets) => {
        response.send(tickets);
      })
      .catch((error) => {
        console.log(error);
        response.status(500);
      });
  });

  // find ticket
  app.get("/ticket/:ticketId", async (request, response) => {
    const ticketParams = z.object({
      ticketId: z.string(),
    });

    const { ticketId } = ticketParams.parse(request.params);

    await prisma.ticket
      .findFirst({
        where: {
          id: {
            equals: ticketId,
          },
        },
      })
      .then((ticket) => {
        if (!ticket) {
          response.code(204).send({ error: "ticket does not exists" });
        }
        response.send(ticket);
      })
      .catch((error) => {
        console.log(error);
        response.status(500);
      });
  });

  // create ticket
  app.post("/ticket", async (request, response) => {
    const ticketBody = z.object({
      user_id: z.string(),
      event_id: z.string(),
      ticket_type_id: z.string(),
    });

    const { user_id, event_id, ticket_type_id } = ticketBody.parse(
      request.body
    );

    await prisma.ticket
      .create({
        data: {
          user_id,
          event_id,
          ticket_type_id,
        },
      })
      .then(() => {
        response.status(201);
      })
      .catch((error) => {
        console.log(error);
        response.status(500);
      });
  });
}
