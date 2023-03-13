import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function AuthController(app: FastifyInstance) {
  app.get("/user/auth/:userId", async (request, response) => {
    const tokenParams = z.object({
      userId: z.string(),
    });

    const { userId } = tokenParams.parse(request.params);

    const existsUser = await prisma.user.findFirst({
      where: {
        id: {
          equals: userId,
        },
      },
    });

    if (!existsUser) {
      return response.send({ error: "This user does not exists" });
    }

    const data = {
      userId,
    };

    const token = app.jwt.sign(data);
    response.send({ token });
  });

  app.get("/organizer/auth/:organizerId", async (request, response) => {
    const tokenParams = z.object({
      organizerId: z.string(),
    });

    const { organizerId } = tokenParams.parse(request.params);

    const existsOrganizer = await prisma.organizer.findFirst({
      where: {
        id: {
          equals: organizerId,
        },
      },
    });

    if (!existsOrganizer) {
      return response.send({ error: "This organizer does not exists" });
    }

    const data = {
      organizerId,
    };

    const token = app.jwt.sign(data);
    response.send({ token });
  });

  app.get(
    "/user/auth",
    // @ts-ignore
    { onRequest: [app.authenticate] },
    async (request, response) => {
      return request.user;
    }
  );
}
