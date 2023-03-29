import { FastifyInstance } from "fastify";
import { z } from "zod";
import { multerUpload } from "../lib/multer";
import { prisma } from "../lib/prisma";

export async function EventController(app: FastifyInstance) {
  // get events
  app.get("/event", async (request, response) => {
    await prisma.event
      .findMany({
        include: {
          TicketType: true,
        },
      })
      .then((events) => {
        response.send(events);
      })
      .catch((error) => {
        console.log(error);
        response.status(500);
      });
  });

  // get events
  app.get("/event/search/:input", async (request, response) => {
    const eventSearchParams = z.object({
      input: z.string(),
    });

    const { input } = eventSearchParams.parse(request.params);

    if (!input) {
      response.code(200).send({ error: "Input null" });
    }

    await prisma.event
      .findMany({
        where: {
          name: {
            startsWith: input,
            mode: "insensitive",
          },
        },
        include: {
          TicketType: true,
        },
      })
      .then((events) => {
        response.send(events);
      })
      .catch((error) => {
        console.log(error);
        response.status(500);
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
        include: {
          TicketType: true,
        },
      })
      .then((events) => {
        response.send(events);
      })
      .catch((error) => {
        console.log(error);
        response.status(500);
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
          response.code(204).send({ error: "Event does not exists" });
        }
        response.send(event);
      })
      .catch((error) => {
        console.log(error);
        response.status(500);
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
        attraction: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        batch: z.string(),
      });

      const { organizerId } = eventParams.parse(request.params);

      const file_name = request.file.filename;

      const { name, location, attraction, description, date, batch } =
        eventBody.parse(request.body);

      const intBatch = parseInt(batch, 10);

      await prisma.event
        .create({
          data: {
            name,
            location,
            attraction,
            description,
            date,
            batch: intBatch,
            organizer_id: organizerId,
            file_name,
          },
        })
        .then(() => {
          response.status(201);
        })
        .catch((error) => {
          response.status(500);
        });
    }
  );
}
