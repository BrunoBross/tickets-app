import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { verifyCnpj, verifyCpf, verifyEmail } from "./utils";
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
        console.log(error);
        response.status(500);
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
          response.code(204).send({ error: "organizer does not exists" });
        }
        response.send(organizer);
      })
      .catch((error) => {
        console.log(error);
        response.status(500);
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

    const hashedPassword = await bcrypt.hash(password, 8);

    let formatedCpf;
    if (cpf) {
      formatedCpf = cpf.replace(/\./g, "").replace("-", "");
      const isValidCpf = verifyCpf(formatedCpf);
      if (!isValidCpf) {
        return response.code(400).send({ error: "Invalid CPF" });
      }
    }

    let formatedCnpj;
    if (cnpj) {
      formatedCnpj = cnpj.replace(/\./g, "").replace("/", "").replace("-", "");
      const isValidCnpj = verifyCnpj(formatedCnpj);
      if (!isValidCnpj) {
        return response.code(400).send({ error: "Invalid CNPJ" });
      }
    }

    const isValidEmail = verifyEmail(email);
    if (!isValidEmail) {
      return response.code(400).send({ error: "Invalid email" });
    }

    let existsCpf;
    if (formatedCpf) {
      const existsCpf = await prisma.organizer.findFirst({
        where: {
          cpf: {
            equals: formatedCpf,
          },
        },
      });
    }

    let existsCnpj;
    if (formatedCnpj) {
      const existsCnpj = await prisma.organizer.findFirst({
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

    console.log(formatedCpf);

    if (existsCpf) {
      console.log(existsCpf);
      return response.code(409).send({ error: "Already exists CPF" });
    }

    if (existsCnpj) {
      return response.code(409).send({ error: "Already exists CNPJ" });
    }

    if (existsEmail) {
      return response.code(409).send({ error: "Already exists email" });
    }

    if (!formatedCpf && !formatedCnpj) {
      return response.send({ error: "CPF or CNPJ is required" });
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
        response.status(201);
      })
      .catch((error) => {
        console.log(error);
        response.status(500);
      });
  });
}
