import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function TicketTypeController(app: FastifyInstance) {
  // get ticketTypes by event
  app.get("/ticket-type/:eventId", async (request, response) => {
    const ticketTypeParams = z.object({
      eventId: z.string(),
    });

    const { eventId } = ticketTypeParams.parse(request.params);

    await prisma.ticketType
      .findMany({
        where: {
          event_id: {
            equals: eventId,
          },
        },
      })
      .then((ticketTypes) => {
        response.send(ticketTypes);
      })
      .catch((error) => {
        console.log(error);
        response.status(500);
      });
  });

  // // find ticketType
  // app.get("/ticket-type/:ticketTypeId", async (request, response) => {
  //   const ticketTypeParams = z.object({
  //     ticketTypeId: z.string(),
  //   });

  //   const { ticketTypeId } = ticketTypeParams.parse(request.params);

  //   await prisma.ticketType
  //     .findFirst({
  //       where: {
  //         id: {
  //           equals: ticketTypeId,
  //         },
  //       },
  //     })
  //     .then((ticketType) => {
  //       if (!ticketType) {
  //         response.code(204).send({ error: "ticketType does not exists" });
  //       }
  //       response.send(ticketType);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       response.status(500);
  //     });
  // });

  // create ticketType
  app.post("/ticket-type/:eventId", async (request, response) => {
    const ticketTypeParams = z.object({
      eventId: z.string(),
    });

    const ticketTypeBody = z.object({
      price: z.number(),
      name: z.string(),
      batch: z.number(),
      gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    });

    const { eventId } = ticketTypeParams.parse(request.params);

    const { price, name, batch, gender } = ticketTypeBody.parse(request.body);

    await prisma.ticketType
      .create({
        data: {
          price,
          name,
          batch,
          gender,
          event_id: eventId,
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
