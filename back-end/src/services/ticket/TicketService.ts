import { DefaultException } from "../../exceptions/DefaultException";
import { prisma } from "../../lib/prisma";

export class TicketService {
  async getAllTickets() {
    const tickets = await prisma.ticket.findMany({
      include: {
        ticket_lot: true,
      },
    });

    return tickets;
  }

  async findTicketById(ticketId: string) {
    const ticket = await prisma.ticket.findFirst({
      where: {
        id: {
          equals: ticketId,
        },
      },
      include: {
        ticket_lot: {
          include: {
            event: true,
            ticket_type: true,
          },
        },
      },
    });

    if (!ticket) {
      throw new DefaultException("Ingresso não encontrado", 404);
    }

    return ticket;
  }

  async getTicketsByUserId(userId: string) {
    const tickets = await prisma.ticket.findMany({
      where: {
        user_id: {
          equals: userId,
        },
        AND: {
          used: {
            equals: false,
          },
        },
      },
      include: {
        ticket_lot: {
          include: {
            event: true,
            ticket_type: true,
          },
        },
      },
    });

    return tickets;
  }

  async transferTicket(ticketId: string, newUserId: string) {
    await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        user_id: newUserId,
      },
    });

    return { message: "Ingresso transferido com sucesso", status: 200 };
  }

  async buyTicket(userId: string, ticketLotId: string) {
    try {
      const ticketLotTransaction = await prisma.$transaction(async (prisma) => {
        const blockTicketLot = await prisma.$queryRaw`
          SELECT *
          FROM ticket_lot
          WHERE id = ${ticketLotId}
          FOR UPDATE
        `;

        const ticketLot = await prisma.ticketLot.findUnique({
          where: {
            id: ticketLotId,
          },
          select: {
            amount_available: true,
          },
        });

        if (ticketLot.amount_available <= 0) {
          return {
            message: "Esse ingresso não está mais disponível",
            status: 404,
          };
        }

        await prisma.ticketLot.update({
          where: {
            id: ticketLotId,
          },
          data: {
            amount_available: ticketLot.amount_available - 1,
          },
        });

        return ticketLot;
      });

      await prisma.ticket.create({
        data: {
          user_id: userId,
          ticket_lot_id: ticketLotId,
        },
      });

      return { message: "Ingresso criado com sucesso", status: 200 };
    } catch (error) {
      return { message: "Ocorreu um erro interno", status: 500 };
    }
  }
}
