import { prisma } from "../lib/prisma";
import { TicketLotService } from "./TicketLotService";

const ticketLotService = new TicketLotService();

export class EventService {
  async getAllEvents() {
    const events = await prisma.event.findMany();

    const eventsWithLots = await Promise.all(
      events.map(async (event) => {
        const ticket_lots = await ticketLotService.getAllTicketLotByEventId(
          event.id
        );
        return { ...event, ticket_lots };
      })
    );

    return eventsWithLots;
  }
}
