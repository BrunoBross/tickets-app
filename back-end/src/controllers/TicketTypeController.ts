import { FastifyInstance } from "fastify";
import { z } from "zod";
import { ServerResponseError } from "../helpers/ServerResponseError";
import { TicketTypeService } from "../services/TicketTypeService";
import { createTicketTypeBody } from "../types/TicketTypeTypes";

const ticketTypeService = new TicketTypeService();

export async function TicketTypeController(app: FastifyInstance) {
  app.get("/ticket-type", async (request, response) => {
    try {
      const ticketTypes = await ticketTypeService.getAllTicketTypes();

      response.send(ticketTypes);
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });

  app.get("/ticket-type/find/:ticketTypeId", async (request, response) => {
    try {
      const ticketTypeParams = z.object({
        ticketTypeId: z.string(),
      });

      const { ticketTypeId } = ticketTypeParams.parse(request.params);

      const ticketType = await ticketTypeService.findTicketTypeById(
        ticketTypeId
      );

      return response.send(ticketType);
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });

  app.delete("/ticket-type/delete/:ticketTypeId", async (request, response) => {
    try {
      const ticketTypeParams = z.object({
        ticketTypeId: z.string(),
      });

      const { ticketTypeId } = ticketTypeParams.parse(request.params);

      const result = await ticketTypeService.deleteTicketTypeById(ticketTypeId);

      return response.status(result.status).send();
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });

  app.post("/ticket-type", async (request, response) => {
    try {
      const parsedCreateTicketTypeBody = createTicketTypeBody.parse(
        request.body
      );

      const result = await ticketTypeService.createTicketType(
        parsedCreateTicketTypeBody
      );

      return response.status(result.status).send({ message: result.message });
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });
}
