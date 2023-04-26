import { FastifyInstance } from "fastify";
import { z } from "zod";
import { ServerResponseError } from "../helpers/ServerResponseError";
import { TicketLotService } from "../services/TicketLotService";
import { createTicketLotBody } from "../types/TicketLotTypes";
import { prisma } from "../lib/prisma";

const ticketLotService = new TicketLotService();

export async function TicketLotController(app: FastifyInstance) {
  app.get("/ticket-lot/:event_id", async (request, response) => {
    try {
      const ticketLotParams = z.object({
        event_id: z.string(),
      });

      const { event_id } = ticketLotParams.parse(request.params);

      const ticketLots = await ticketLotService.getAllTicketLotByEventId(
        event_id
      );

      response.send(ticketLots);
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });

  app.post("/ticket-lot/:eventId", async (request, response) => {
    try {
      const ticketLotParams = z.object({
        eventId: z.string(),
      });

      const parsedCreateTicketLotBody = createTicketLotBody.parse(request.body);

      const { eventId } = ticketLotParams.parse(request.params);

      const result = await ticketLotService.createTicketLot(
        eventId,
        parsedCreateTicketLotBody
      );

      return response.status(result.status).send({ message: result.message });
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });
}
