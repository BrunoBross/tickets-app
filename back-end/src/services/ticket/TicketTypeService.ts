import { DefaultException } from "../../exceptions/DefaultException";
import { prisma } from "../../lib/prisma";
import { CreateTicketTypeBodyInterface } from "../../types/TicketTypeTypes";

export class TicketTypeService {
  async getAllTicketTypes() {
    const ticketTypes = await prisma.ticketType.findMany();

    return ticketTypes;
  }

  async findTicketTypeById(ticketTypeId: string) {
    const ticketType = await prisma.ticketType.findFirst({
      where: {
        id: { equals: ticketTypeId },
      },
    });

    if (!ticketType) {
      throw new DefaultException("Tipo de ingresso não encontrado", 404);
    }

    return ticketType;
  }

  async deleteTicketTypeById(ticketTypeId: string) {
    // Check ticketType exists
    await this.findTicketTypeById(ticketTypeId);

    await prisma.ticketType.update({
      where: {
        id: ticketTypeId,
      },
      data: {
        active: false,
      },
    });

    return { status: 204 };
  }

  async createTicketType(ticketTypeBody: CreateTicketTypeBodyInterface) {
    const { name, description } = ticketTypeBody;

    await prisma.ticketType.create({
      data: {
        name,
        description,
      },
    });

    return { message: "Tipo de ingresso cadastrado com sucesso", status: 200 };
  }
}
