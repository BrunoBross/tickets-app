import { userSelect } from "../helpers/UserUtils";
import { prisma } from "../lib/prisma";
import { cpf as cpfUtils } from "cpf-cnpj-validator";
import { verifyEmail } from "../helpers/Utils";
import bcrypt from "bcrypt";
import { DefaultException } from "../exceptions/DefaultException";
import { CreateUserBodyInterface } from "../types/UserTypes";

export class UserService {
  async getAllUsers(filter: string) {
    const activeCondition = filter === "all" ? false : true;

    const users = await prisma.user.findMany({
      where: {
        active: {
          equals: activeCondition,
        },
      },
      select: userSelect,
    });

    return users;
  }

  async findUserById(userId: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: {
          equals: userId,
        },
        AND: {
          active: {
            equals: true,
          },
        },
      },
      select: userSelect,
    });

    if (!user) {
      throw new DefaultException("Usuário não encontrado", 400);
    }

    return user;
  }

  async findUserByCpf(userCpf: string) {
    const normalizedCpf = cpfUtils.strip(userCpf);

    const user = await prisma.user.findFirst({
      where: {
        cpf: {
          equals: normalizedCpf,
        },
        AND: {
          active: {
            equals: true,
          },
        },
      },
      select: userSelect,
    });

    if (!user) {
      throw new DefaultException("Usuário não encontrado", 400);
    }

    return user;
  }

  async findUserByEmail(userEmail: string) {
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: userEmail,
        },
        AND: {
          active: {
            equals: true,
          },
        },
      },
      select: userSelect,
    });

    if (!user) {
      throw new DefaultException("Usuário não encontrado", 400);
    }

    return user;
  }

  async deleteUserById(userId: string) {
    // Check user exists
    await this.findUserById(userId);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        active: false,
      },
    });

    return { message: "Usuário removido com sucesso" };
  }

  async createUser(user: CreateUserBodyInterface) {
    const { name, surname, email, cpf, birth, password } = user;

    if (!cpfUtils.isValid(cpf)) {
      throw new DefaultException("CPF inválido", 400);
    }

    if (!verifyEmail(email)) {
      throw new DefaultException("E-mail inválido", 400);
    }

    const normalizedCpf = cpfUtils.strip(cpf);

    await prisma.user
      .findFirst({
        where: {
          cpf: {
            equals: normalizedCpf,
          },
          AND: {
            active: {
              equals: true,
            },
          },
        },
      })
      .then((response) => {
        if (response) {
          throw new DefaultException("Este CPF já está sendo utilizado", 400);
        }
      });

    await prisma.user
      .findFirst({
        where: {
          email: {
            equals: email,
          },
          AND: {
            active: {
              equals: true,
            },
          },
        },
      })
      .then((response) => {
        if (response) {
          throw new DefaultException(
            "Este e-mail já está sendo utilizado",
            400
          );
        }
      });

    const hashedPassword = await bcrypt.hash(password, 8);

    await prisma.user.create({
      data: {
        name,
        surname,
        email,
        cpf: normalizedCpf,
        birth,
        password: hashedPassword,
      },
    });

    return { message: "Usuário cadastrado com sucesso" };
  }
}
