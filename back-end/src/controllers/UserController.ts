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
        console.error(error);
        response.status(500).send({ error: "Ocorreu um erro interno" });
      });
  });

  // find user
  app.get("/user/:userId", async (request, response) => {
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
          response.code(204).send({ error: "Esse usuário não existe" });
        }
        response.send(user);
      })
      .catch((error) => {
        console.error(error);
        response.status(500).send({ error: "Ocorreu um erro interno" });
      });
  });

  // find user by cpf
  app.get("/user/findByCpf/:userCpf", async (request, response) => {
    const userParams = z.object({
      userCpf: z.string(),
    });
    const { userCpf } = userParams.parse(request.params);

    const formatedCpf = userCpf.replace(/\./g, "").replace("-", "");

    await prisma.user
      .findFirst({
        where: {
          cpf: {
            equals: formatedCpf,
          },
        },
      })
      .then((user) => {
        if (!user) {
          response.code(204).send({ error: "Esse usuário não existe" });
        }
        response.send(user);
      })
      .catch((error) => {
        console.error(error);
        response.status(500).send({ error: "Ocorreu um erro interno" });
      });
  });

  // find user by email
  app.get("/user/findByEmail/:userEmail", async (request, response) => {
    const userParams = z.object({
      userEmail: z.string(),
    });
    const { userEmail } = userParams.parse(request.params);

    await prisma.user
      .findFirst({
        where: {
          email: {
            equals: userEmail,
          },
        },
      })
      .then((user) => {
        if (!user) {
          response.code(204).send({ error: "Esse usuário não existe" });
        }
        response.send(user);
      })
      .catch((error) => {
        console.error(error);
        response.status(500).send({ error: "Ocorreu um erro interno" });
      });
  });

  // create user
  app.post("/user", async (request, response) => {
    const userBody = z.object({
      name: z.string(),
      surname: z.string(),
      email: z.string(),
      cpf: z.string(),
      birth: z.coerce.date(),
      address: z.string(),
      zip_code: z.string(),
      password: z.string(),
    });

    const { name, surname, email, cpf, birth, address, zip_code, password } =
      userBody.parse(request.body);

    const formatedCpf = cpf.replace(/\./g, "").replace("-", "");
    const formatedCep = zip_code.replace(/\./g, "").replace("-", "");
    const hashedPassword = await bcrypt.hash(password, 8);

    const isValidCpf = verifyCpf(formatedCpf);
    const isValidCep = await verifyCep(formatedCep);
    const isValidEmail = verifyEmail(email);

    if (!isValidCpf) {
      return response.code(400).send({ error: "CPF inválido" });
    }

    if (!isValidCep) {
      return response.code(400).send({ error: "CEP inválido" });
    }

    if (!isValidEmail) {
      return response.code(400).send({ error: "E-mail inválido" });
    }

    const existsCpf = await prisma.user.findFirst({
      where: {
        cpf: {
          equals: formatedCpf,
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
      return response
        .code(409)
        .send({ error: "Este CPF já está sendo utilizado" });
    }

    if (existsEmail) {
      return response
        .code(409)
        .send({ error: "Este e-mail já está sendo utilizado" });
    }

    await prisma.user
      .create({
        data: {
          name,
          surname,
          email,
          cpf: formatedCpf,
          birth,
          address,
          zip_code: formatedCep,
          password: hashedPassword,
        },
      })
      .then(() => {
        response
          .status(201)
          .send({ message: "Usuário cadastrado com sucesso" });
      })
      .catch((error) => {
        console.error(error);
        response.status(500).send({ error: "Ocorreu um erro interno" });
      });
  });
}
