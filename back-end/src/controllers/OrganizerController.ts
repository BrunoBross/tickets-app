import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import {
  formatCnpj,
  formatCpf,
  verifyCnpj,
  verifyCpf,
  verifyEmail,
} from "../helpers/Utils";
import bcrypt from "bcrypt";

export async function OrganizerController(app: FastifyInstance) {
  // get organizers
  app.get("/organizer", async (request, response) => {
    await prisma.organizer
      .findMany()
      .then((organizers) => {
        response.send(organizers);
      })
      .catch((error) => {
        console.error(error);
        response.status(500).send({ error: "Ocorreu um erro interno" });
      });
  });

  // find organizer
  app.get("/organizer/:organizerId", async (request, response) => {
    const organizerParams = z.object({
      organizerId: z.string(),
    });

    const { organizerId } = organizerParams.parse(request.params);

    await prisma.organizer
      .findFirst({
        where: {
          id: {
            equals: organizerId,
          },
        },
      })
      .then((organizer) => {
        if (!organizer) {
          response
            .code(204)
            .send({ error: "Esse organizador não foi encontrado" });
        }
        response.send(organizer);
      })
      .catch((error) => {
        console.error(error);
        response.status(500).send({ error: "Ocorreu um erro interno" });
      });
  });

  // create organizer
  app.post("/organizer", async (request, response) => {
    const organizerBody = z.object({
      name: z.string(),
      surname: z.string(),
      email: z.string(),
      cpf: z.string().optional(),
      cnpj: z.string().optional(),
      password: z.string(),
    });

    const { name, surname, email, cpf, cnpj, password } = organizerBody.parse(
      request.body
    );

    if (password.length < 8) {
      return response
        .code(400)
        .send({ error: "A senha deve possuir no mínimo 8 caracteres" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    let formatedCpf;
    if (cpf) {
      formatedCpf = formatCpf(cpf);
      const isValidCpf = verifyCpf(formatedCpf);
      if (!isValidCpf) {
        return response.code(400).send({ error: "CPF inválido" });
      }
    }

    let formatedCnpj;
    if (cnpj) {
      formatedCnpj = formatCnpj(cnpj);
      const isValidCnpj = verifyCnpj(formatedCnpj);
      if (!isValidCnpj) {
        return response.code(400).send({ error: "CNPJ inválido" });
      }
    }

    const isValidEmail = verifyEmail(email);
    if (!isValidEmail) {
      return response.code(400).send({ error: "E-mail inválido" });
    }

    let existsCpf;
    if (formatedCpf) {
      existsCpf = await prisma.organizer.findFirst({
        where: {
          cpf: {
            equals: formatedCpf,
          },
        },
      });
    }

    let existsCnpj;
    if (formatedCnpj) {
      existsCnpj = await prisma.organizer.findFirst({
        where: {
          cnpj: {
            equals: formatedCnpj,
          },
        },
      });
    }

    const existsEmail = await prisma.organizer.findFirst({
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

    if (existsCnpj) {
      return response
        .code(409)
        .send({ error: "Este CNPJ já está sendo utilizado" });
    }

    if (existsEmail) {
      return response
        .code(409)
        .send({ error: "Este e-mail já está sendo utilizado" });
    }

    if (!formatedCpf && !formatedCnpj) {
      return response.send({ error: "CPF ou CNPJ são necessários" });
    }

    await prisma.organizer
      .create({
        data: {
          name,
          surname,
          email,
          cpf: formatedCpf,
          cnpj: formatedCnpj,
          password: hashedPassword,
        },
      })
      .then(() => {
        response
          .status(201)
          .send({ message: "Organizador cadastrado com sucesso" });
      })
      .catch((error) => {
        console.error(error);
        response.status(500).send({ error: "Ocorreu um erro interno" });
      });
  });
}
