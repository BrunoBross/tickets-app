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
        console.error(error);
        response.status(500).send({ error: "Ocorreu um erro interno" });
      });
  });

  // find ticketType
  app.get("/ticket-type/find/:ticketTypeId", async (request, response) => {
    const ticketTypeParams = z.object({
      ticketTypeId: z.string(),
    });

    const { ticketTypeId } = ticketTypeParams.parse(request.params);

    await prisma.ticketType
      .findFirst({
        where: {
          id: {
            equals: ticketTypeId,
          },
        },
      })
      .then((ticketType) => {
        if (!ticketType) {
          response
            .code(204)
            .send({ error: "Esse tipo de ingresso não foi encontrado" });
        }
        response.send(ticketType);
      })
      .catch((error) => {
        console.error(error);
        response.status(500).send({ error: "Ocorreu um erro interno" });
      });
  });

  // create ticketType
  app.post("/ticket-type/:eventId", async (request, response) => {
    const ticketTypeParams = z.object({
      eventId: z.string(),
    });

    const ticketTypeBody = z.object({
      price: z.number(),
      name: z.string(),
      lot: z.number(),
      amount: z.number(),
    });

    const { eventId } = ticketTypeParams.parse(request.params);

    const { price, name, lot, amount } = ticketTypeBody.parse(request.body);

    const tax = price * (15 / 100);

    await prisma.ticketType
      .create({
        data: {
          price,
          tax,
          name,
          lot,
          amount,
          event_id: eventId,
        },
      })
      .then(() => {
        response
          .status(201)
          .send({ message: "Tipo de ingresso cadastrado com sucesso" });
      })
      .catch((error) => {
        console.error(error);
        response.status(500).send({ error: "Ocorreu um erro interno" });
      });
  });
}
