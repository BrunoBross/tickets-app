import { DefaultException } from "../exceptions/DefaultException";
import { prisma } from "../lib/prisma";
import { CreateTicketTypeBodyInterface } from "../types/TicketTypeTypes";

export class TicketTypeService {
  async getAllTicketTypesByEventId(eventId: string) {
    const ticketTypes = await prisma.ticketType.findMany({
      where: {
        event_id: {
          equals: eventId,
        },
      },
      orderBy: {
        price: "asc",
      },
    });

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

    await prisma.ticketType.delete({
      where: {
        id: ticketTypeId,
      },
    });

    return { status: 204 };
  }

  async createTicketType(
    eventId: string,
    ticketTypeBody: CreateTicketTypeBodyInterface
  ) {
    const { name, price, lot, amount } = ticketTypeBody;

    const tax = price * (15 / 100);

    await prisma.ticketType.create({
      data: {
        price,
        tax,
        name,
        lot,
        amount,
        event_id: eventId,
      },
    });

    return { message: "Tipo de ingresso cadastrado com sucesso", status: 200 };
  }
}
