import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function TicketController(app: FastifyInstance) {
  // get tickets
  app.get("/ticket", async (request, response) => {
    await prisma.ticket
      .findMany({
        include: {
          ticket_lot: true,
        },
      })
      .then((tickets) => {
        response.send(tickets);
      })
      .catch((error) => {
        console.error(error);
        response.status(500).send({ error: "Ocorreu um erro interno" });
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
        include: {
          ticket_lot: true,
        },
      })
      .then((ticket) => {
        if (!ticket) {
          response
            .code(204)
            .send({ error: "Esse ingresso não foi encontrado" });
        }
        response.send(ticket);
      })
      .catch((error) => {
        console.error(error);
        response.status(500).send({ error: "Ocorreu um erro interno" });
      });
  });

  // get tickets by userId
  app.get("/ticket/user/:userId", async (request, response) => {
    const ticketParams = z.object({
      userId: z.string(),
    });

    const { userId } = ticketParams.parse(request.params);

    await prisma.ticket
      .findMany({
        where: {
          user_id: {
            equals: userId,
          },
          AND: {
            used: {
              equals: false,
            },
          },
        },
        include: {
          ticket_lot: {
            include: {
              event: true,
            },
          },
        },
      })
      .then((ticket) => {
        if (!ticket) {
          response
            .code(204)
            .send({ error: "Esse usuário não possui ingressos" });
        }
        response.send(ticket);
      })
      .catch((error) => {
        console.error(error);
        response.status(500).send({ error: "Ocorreu um erro interno" });
      });
  });

  app.patch("/ticket/transfer", async (request, response) => {
    const ticketBody = z.object({
      ticketId: z.string(),
      newUserId: z.string(),
    });

    const { ticketId, newUserId } = ticketBody.parse(request.body);

    await prisma.ticket
      .update({
        where: {
          id: ticketId,
        },
        data: {
          user_id: newUserId,
        },
      })
      .then(() => {
        response
          .status(200)
          .send({ message: "Ingresso transferido com sucesso" });
      })
      .catch((error) => {
        console.error(error);
        response.status(500).send({ error: "Ocorreu um erro interno" });
      });
  });

  // create ticket / buy ticket
  app.post("/ticket", async (request, response) => {
    const ticketBody = z.object({
      user_id: z.string(),
      ticket_lot_id: z.string(),
    });

    const { user_id, ticket_lot_id } = ticketBody.parse(request.body);

    const ticketLot = await prisma.ticketLot.findUnique({
      where: {
        id: ticket_lot_id,
      },
      select: {
        amount_available: true,
      },
    });

    if (ticketLot.amount_available <= 0) {
      return response
        .code(404)
        .send({ error: "Esse ingresso não está mais disponível" });
    }

    const newAmountAvailable = ticketLot.amount_available - 1;

    await prisma.ticketLot
      .update({
        where: {
          id: ticket_lot_id,
        },
        data: {
          amount_available: newAmountAvailable,
        },
      })
      .then(async () => {
        await prisma.ticket
          .create({
            data: {
              user_id,
              ticket_lot_id,
            },
          })
          .then(() => {
            response
              .status(200)
              .send({ message: "Ingresso criado com sucesso" });
          })
          .catch((error) => {
            console.error(error);
            response.status(500).send({ error: "Ocorreu um erro interno" });
          });
      });
  });
}
