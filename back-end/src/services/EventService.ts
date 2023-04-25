import { prisma } from "../lib/prisma";

export class EventService {
  async getAllEvents() {
    const events = await prisma.event.findMany();

    return events;
  }
}
