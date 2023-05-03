import { DefaultException } from "../exceptions/DefaultException";
import { prisma } from "../lib/prisma";
import { CreateEventBodyInterface } from "../types/EventTypes";
import { TicketLotService } from "./TicketLotService";

const ticketLotService = new TicketLotService();

export class EventService {
  async getAllEvents() {
    const events = await prisma.event.findMany();

    // insere os lotes disponiveis em cada eventos
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

  async searchEventsByName(input: string) {
    const events = await prisma.event.findMany({
      where: {
        name: {
          startsWith: input,
          mode: "insensitive",
        },
      },
    });

    return events;
  }

  async getEventsByOrganizerId(organizerId: string) {
    const events = prisma.event.findMany({
      where: {
        organizer_id: {
          equals: organizerId,
        },
      },
    });

    return events;
  }

  async findEventById(eventId: string) {
    const event = await prisma.event.findFirst({
      where: {
        id: {
          equals: eventId,
        },
      },
    });

    if (!event) {
      throw new DefaultException("Evento não encontrado", 404);
    }

    const ticket_lots = await ticketLotService.getAllTicketLotByEventId(
      event.id
    );

    const eventWithLots = { ...event, ticket_lots };

    return eventWithLots;
  }

  async deleteEventById(eventId: string) {
    await prisma.event.delete({
      where: {
        id: eventId,
      },
    });

    return { status: 204 };
  }

  async createEvent(
    organizerId: string,
    event: CreateEventBodyInterface,
    file_name: string
  ) {
    const { name, date, attraction, description, location, location_link } =
      event;

    await prisma.event.create({
      data: {
        name,
        location,
        location_link,
        attraction,
        description,
        date,
        organizer_id: organizerId,
        file_name,
      },
    });

    return { message: "Evento cadastrado com sucesso", status: 200 };
  }
}
