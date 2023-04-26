import { FastifyInstance } from "fastify";
import { z } from "zod";
import { multerUpload } from "../multer";
import { prisma } from "../lib/prisma";
import { ServerResponseError } from "../helpers/ServerResponseError";
import { EventService } from "../services/EventService";

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

  // get events
  app.get("/event/search/:input", async (request, response) => {
    const eventSearchParams = z.object({
      input: z.string(),
    });

    const { input } = eventSearchParams.parse(request.params);

    if (!input) {
      response.code(200).send({ error: "Preencha o campo" });
    }

    await prisma.event
      .findMany({
        where: {
          name: {
            startsWith: input,
            mode: "insensitive",
          },
        },
      })
      .then((events) => {
        if (!events) {
          response
            .code(204)
            .send({ error: "Não foi encontrado nenhum evento" });
        }
        response.send(events);
      })
      .catch((error) => {
        console.error(error);
        response.status(500).send({ error: "Ocorreu um erro interno" });
      });
  });

  // get events by organizer id
  app.get("/organizer/event/:organizerId", async (request, response) => {
    const eventParams = z.object({
      organizerId: z.string(),
    });

    const { organizerId } = eventParams.parse(request.params);

    await prisma.event
      .findMany({
        where: {
          organizer_id: {
            equals: organizerId,
          },
        },
      })
      .then((events) => {
        if (!events) {
          response
            .code(204)
            .send({ error: "Não foi encontrado nenhum evento" });
        }
        response.send(events);
      })
      .catch((error) => {
        console.error(error);
        response.status(500).send({ error: "Ocorreu um erro interno" });
      });
  });

  // find event
  app.get("/event/:eventId", async (request, response) => {
    const eventParams = z.object({
      eventId: z.string(),
    });

    const { eventId } = eventParams.parse(request.params);

    await prisma.event
      .findFirst({
        where: {
          id: {
            equals: eventId,
          },
        },
      })
      .then((event) => {
        if (!event) {
          response.code(204).send({ error: "Este evento não foi encontrado" });
        }
        response.send(event);
      })
      .catch((error) => {
        console.error(error);
        response.status(500).send({ error: "Ocorreu um erro interno" });
      });
  });

  // delete event
  app.delete("/event/delete/:eventId", async (request, response) => {
    const eventParams = z.object({
      eventId: z.string(),
    });

    const { eventId } = eventParams.parse(request.params);

    await prisma.event.delete({
      where: {
        id: eventId,
      },
    });
  });

  // create event
  app.post(
    "/event/:organizerId",
    { preHandler: multerUpload.single("logo") },
    async (request: any, response) => {
      const eventParams = z.object({
        organizerId: z.string(),
      });

      const eventBody = z.object({
        name: z.string(),
        location: z.string(),
        location_link: z.string(),
        attraction: z.string(),
        description: z.string(),
        date: z.coerce.date(),
      });

      const { organizerId } = eventParams.parse(request.params);

      const file_name = request.file.filename;

      const { name, location, location_link, attraction, description, date } =
        eventBody.parse(request.body);

      await prisma.event
        .create({
          data: {
            name,
            location,
            location_link,
            attraction,
            description,
            date,
            organizer_id: organizerId,
            file_name,
          },
        })
        .then(() => {
          response
            .status(201)
            .send({ message: "Evento cadastrado com sucesso" });
        })
        .catch((error) => {
          console.error(error);
          response.status(500).send({ error: "Ocorreu um erro interno" });
        });
    }
  );
}
