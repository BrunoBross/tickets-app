import { prisma } from "../src/lib/prisma";
import { TicketLotService } from "../src/services/ticket/TicketLotService";
import bcrypt from "bcrypt";

const ticketLotService = new TicketLotService();

const description =
  "Lorem 😂😂 ipsum 🕵️‍♂️dolor sit✍️ amet, consectetur adipiscing😇😇🤙 elit, sed do eiusmod🥰 tempor 😤😤🏳️‍🌈incididunt ut 👏labore 👏et👏 dolore 👏magna👏 aliqua. Ut enim ad minim 🐵✊🏿veniam,❤️😤😫😩💦💦 quis nostrud 👿🤮exercitation ullamco 🧠👮🏿‍♀️🅱️laboris nisi ut aliquip❗️ ex ea commodo consequat. 💯Duis aute💦😂😂😂 irure dolor 👳🏻‍♂️🗿in reprehenderit 🤖👻👎in voluptate velit esse cillum dolore 🙏🙏eu fugiat🤔 nulla pariatur. 🙅‍♀️🙅‍♀️Excepteur sint occaecat🤷‍♀️🤦‍♀️ cupidatat💅 non💃 proident,👨‍👧 sunt🤗 in culpa😥😰😨 qui officia🤩🤩 deserunt mollit 🧐anim id est laborum.🤔🤔";

async function main() {
  const organizer = await prisma.organizer.create({
    data: {
      name: "Organizador",
      surname: "Teste",
      email: "organizador@teste.com",
      cpf: "00000000000",
      cnpj: null,
      password: await bcrypt.hash("12345678", 8),
    },
  });

  const usersToCreateList = [
    { name: "Azul", cpf: "35386055054" },
    { name: "Branco", cpf: "55848188017" },
    { name: "Roxo", cpf: "96987466092" },
  ];

  usersToCreateList.map(async (item, idx) => {
    await prisma.user.create({
      data: {
        name: item.name,
        surname: "Teste",
        email: `usuario${idx + 1}@teste.com`,
        birth: new Date("2000-01-01T00:00:00.000Z"),
        cpf: item.cpf,
        password: await bcrypt.hash("12345678", 8),
      },
    });
  });

  // a imagem está sendo adicionada como seeded.png,
  // é necessário importar uma imagem para a pasta "uploads"
  // para funcionar
  const event = await prisma.event.create({
    data: {
      name: "Omega",
      location: "Madagascar",
      location_link: "https://goo.gl/maps/KCh11dkBXUSbheKv5",
      date: new Date("2025-05-23T00:00:00.000Z"),
      attraction: "DJ Flinston",
      description: description + description + description + description,
      organizer_id: organizer.id,
      file_name: "seeded.png",
    },
  });

  const ticketToCreateList = [
    { name: "Pista", description: "Acesso a Pista", price: 90 },
    { name: "Camarote", description: "Acesso ao Camarote", price: 120 },
    { name: "Back-Stage", description: "Acesso ao Back-Stage", price: 150 },
    { name: "Supremo", description: "Acesso ao Supremo", price: 180 },
  ];

  ticketToCreateList.map(async (item) => {
    const ticketType = await prisma.ticketType.create({
      data: {
        name: item.name,
        description: item.description,
      },
    });

    for (let i = 1; i <= 3; i++) {
      await ticketLotService.createTicketLot(event.id, {
        amount_available: 5,
        price: item.price + item.price * ((i * 10) / 100),
        lot_number: i,
        ticket_type_id: ticketType.id,
      });
    }
  });

  console.log("Seed test executed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
