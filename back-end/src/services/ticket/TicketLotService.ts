import { prisma } from "../../lib/prisma";
import { CreateTicketLotBodyInterface } from "../../types/TicketLotTypes";

export class TicketLotService {
  async getAllTicketLotByEventId(event_id: string) {
    const ticketLots = await prisma.ticketLot.findMany({
      where: {
        event_id: {
          equals: event_id,
        },
        amount_available: {
          gt: 0,
        },
      },
      orderBy: {
        total_price: "asc",
      },
      distinct: ["ticket_type_id"],
      include: {
        ticket_type: true,
      },
    });

    return ticketLots;
  }

  async createTicketLot(
    event_id: string,
    ticketLotBody: CreateTicketLotBodyInterface
  ) {
    const { amount_available, lot_number, price, ticket_type_id } =
      ticketLotBody;

    const tax = price * (15 / 100);

    const total_price = price + tax;

    await prisma.ticketLot.create({
      data: {
        amount_available,
        lot_number,
        price,
        tax,
        total_price,
        ticket_type_id,
        event_id,
      },
    });

    return { message: "Lote cadastrado com sucesso", status: 200 };
  }
}
