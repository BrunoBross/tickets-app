import { prisma } from "../lib/prisma";

export class EventService {
  async getAllEvents() {
    const events = await prisma.event.findMany({
      include: {
        TicketType: {
          where: {
            active: true,
          },
          orderBy: {
            price: "asc",
          },
        },
      },
    });

    return events;
  }
}
