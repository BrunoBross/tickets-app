import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

export async function AuthController(app: FastifyInstance) {
  app.post("/user/auth", async (request, response) => {
    const userBody = z.object({
      email: z.string(),
      password: z.string(),
    });

    const { email, password } = userBody.parse(request.body);

    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (!user) {
      return response.code(404).send({ error: "Email não encontrado" });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return response.code(403).send({ error: "Senha incorreta" });
    }

    const data = {
      userId: user.id,
    };

    delete user.password;

    const tokenId = app.jwt.sign(data);
    response.send({ tokenId, user });
  });

  app.post("/organizer/auth", async (request, response) => {
    const organizerBody = z.object({
      email: z.string(),
      password: z.string(),
    });

    const { email, password } = organizerBody.parse(request.body);

    const organizer = await prisma.organizer.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (!organizer) {
      return response.code(404).send({ error: "Email não encontrado" });
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      organizer.password
    );

    if (!isCorrectPassword) {
      return response.code(403).send({ error: "Senha incorreta" });
    }

    const data = {
      organizerId: organizer.id,
    };

    delete organizer.password;

    const tokenId = app.jwt.sign(data);
    response.send({ tokenId, organizer });
  });

  app.get(
    "/organizer/auth",
    { onRequest: [app.authenticate] },
    async (request, response) => {
      const organizer = await prisma.organizer.findFirst({
        where: {
          id: {
            // @ts-ignore
            equals: request.user.organizerId,
          },
        },
      });

      delete organizer.password;

      return organizer;
    }
  );

  app.get(
    "/user/auth",
    { onRequest: [app.authenticate] },
    async (request, response) => {
      const user = await prisma.user.findFirst({
        where: {
          id: {
            // @ts-ignore
            equals: request.user.userId,
          },
        },
      });

      delete user.password;

      return user;
    }
  );
}
