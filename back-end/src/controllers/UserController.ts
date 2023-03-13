import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { verifyCep, verifyCpf, verifyEmail } from "./utils";
import bcrypt from "bcrypt";

export async function UserController(app: FastifyInstance) {
  // get users
  app.get("/user", async (request, response) => {
    await prisma.user
      .findMany()
      .then((users) => {
        response.send(users);
      })
      .catch((error) => {
        console.log(error);
        response.status(500);
      });
  });

  // find user
  app.get(
    "/user/:userId",
    // @ts-ignore
    { onRequest: [app.authenticate] },
    async (request, response) => {
      const userParams = z.object({
        userId: z.string(),
      });
      const { userId } = userParams.parse(request.params);

      await prisma.user
        .findFirst({
          where: {
            id: {
              equals: userId,
            },
          },
        })
        .then((user) => {
          if (!user) {
            response.code(204).send({ error: "User does not exists" });
          }
          response.send(user);
        })
        .catch((error) => {
          console.log(error);
          response.status(500);
        });
    }
  );

  // create user
  app.post("/user", async (request, response) => {
    const userBody = z.object({
      name: z.string(),
      surname: z.string(),
      email: z.string(),
      cpf: z.string(),
      birth: z.coerce.date(),
      gender: z.enum(["MALE", "FEMALE", "OTHER"]),
      address: z.string(),
      zip_code: z.string(),
      password: z.string(),
    });

    const {
      name,
      surname,
      email,
      cpf,
      birth,
      gender,
      address,
      zip_code,
      password,
    } = userBody.parse(request.body);

    const formatedCpf = cpf.replace(/\./g, "").replace("-", "");
    const formatedCep = zip_code.replace(/\./g, "").replace("-", "");
    const hashedPassword = await bcrypt.hash(password, 8);

    const isValidCpf = verifyCpf(formatedCpf);
    const isValidCep = await verifyCep(formatedCep);
    const isValidEmail = verifyEmail(email);

    if (!isValidCpf) {
      return response.code(400).send({ error: "Invalid CPF" });
    }

    if (!isValidCep) {
      return response.code(400).send({ error: "Invalid CEP" });
    }

    if (!isValidEmail) {
      return response.code(400).send({ error: "Invalid email" });
    }

    const existsCpf = await prisma.user.findFirst({
      where: {
        cpf: {
          equals: cpf,
        },
      },
    });

    const existsEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (existsCpf) {
      return response.code(409).send({ error: "Already exists CPF" });
    }

    if (existsEmail) {
      return response.code(409).send({ error: "Already exists email" });
    }

    await prisma.user
      .create({
        data: {
          name,
          surname,
          email,
          cpf: formatedCpf,
          birth,
          gender,
          address,
          zip_code: formatedCep,
          password: hashedPassword,
        },
      })
      .then(() => {
        response.status(201);
      })
      .catch((error) => {
        console.log(error);
        response.status(500);
      });
  });
}
