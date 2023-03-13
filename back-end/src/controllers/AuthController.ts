import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

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
    // @ts-ignore
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
}
