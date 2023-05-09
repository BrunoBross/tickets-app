import { FastifyInstance } from "fastify";
import { z } from "zod";
import { multerUpload } from "../multer";
import { ServerResponseError } from "../helpers/ServerResponseError";
import { EventService } from "../services/event/EventService";
import { createEventBody } from "../types/EventTypes";

const eventService = new EventService();

export async function EventController(app: FastifyInstance) {
  app.get("/event", async (request, response) => {
    try {
      const events = await eventService.getAllEvents();

      response.send(events);
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });

  app.get("/event/search/:input", async (request, response) => {
    try {
      const eventSearchParams = z.object({
        input: z.string(),
      });
      const { input } = eventSearchParams.parse(request.params);

      const events = await eventService.searchEventsByName(input);

      return events;
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });

  app.get("/organizer/event/:organizerId", async (request, response) => {
    try {
      const eventParams = z.object({
        organizerId: z.string(),
      });
      const { organizerId } = eventParams.parse(request.params);

      const events = eventService.getEventsByOrganizerId(organizerId);

      return events;
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });

  app.get("/event/:eventId", async (request, response) => {
    try {
      const eventParams = z.object({
        eventId: z.string(),
      });
      const { eventId } = eventParams.parse(request.params);

      const event = await eventService.findEventById(eventId);

      return event;
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });

  app.delete("/event/delete/:eventId", async (request, response) => {
    const eventParams = z.object({
      eventId: z.string(),
    });
    const { eventId } = eventParams.parse(request.params);

    const result = await eventService.deleteEventById(eventId);

    return response.status(result.status).send();
  });

  app.post(
    "/event/:organizerId",
    { preHandler: multerUpload.single("logo") },
    async (request: any, response) => {
      try {
        const eventParams = z.object({
          organizerId: z.string(),
        });
        const { organizerId } = eventParams.parse(request.params);
        const file_name = request.file.filename;
        const parsedCreateEventBody = createEventBody.parse(request.body);

        const result = await eventService.createEvent(
          organizerId,
          parsedCreateEventBody,
          file_name
        );

        return response.status(result.status).send({ message: result.message });
      } catch (error) {
        return ServerResponseError(error, response);
      }
    }
  );
}
