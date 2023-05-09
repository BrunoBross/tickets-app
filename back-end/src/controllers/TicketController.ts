import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ServerResponseError } from "../helpers/ServerResponseError";
import { TicketService } from "../services/ticket/TicketService";

const ticketService = new TicketService();

export async function TicketController(app: FastifyInstance) {
  app.get("/ticket", async (request, response) => {
    try {
      const tickets = await ticketService.getAllTickets();

      response.send(tickets);
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });

  app.get("/ticket/:ticketId", async (request, response) => {
    try {
      const ticketParams = z.object({
        ticketId: z.string(),
      });

      const { ticketId } = ticketParams.parse(request.params);

      const ticket = await ticketService.findTicketById(ticketId);

      return ticket;
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });

  app.get("/ticket/user/:userId", async (request, response) => {
    try {
      const ticketParams = z.object({
        userId: z.string(),
      });

      const { userId } = ticketParams.parse(request.params);

      const ticket = await ticketService.getTicketsByUserId(userId);

      return ticket;
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });

  app.patch("/ticket/transfer", async (request, response) => {
    try {
      const ticketBody = z.object({
        ticketId: z.string(),
        newUserId: z.string(),
      });

      const { ticketId, newUserId } = ticketBody.parse(request.body);

      const result = await ticketService.transferTicket(ticketId, newUserId);

      return response.status(result.status).send({ message: result.message });
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });

  app.post("/ticket", async (request, response) => {
    try {
      const ticketBody = z.object({
        userId: z.string(),
        ticketLotId: z.string(),
      });

      const { userId, ticketLotId } = ticketBody.parse(request.body);

      const result = await ticketService.buyTicket(userId, ticketLotId);

      return response.status(result.status).send({ message: result.message });
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });
}
