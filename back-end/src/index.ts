import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { Routes } from "./routes";
import Cors from "@fastify/cors";
import Jwt from "@fastify/jwt";
import { multer } from "./lib/multer";
import path from "path";

require("dotenv").config();

const app: FastifyInstance = Fastify();
const PORT = parseInt(process.env.PORT, 10) || 3000;

interface Organizer {
  organizerId: number;
}

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
      done: (err?: Error | null, user?: Organizer) => void
    ) => void;
  }
}

app.register(multer.contentParser);

app.register(require("@fastify/static"), {
  root: path.join(__dirname, "/lib/uploads"),
  prefix: "/uploads/logo/",
});

app.register(Cors);

app.register(Jwt, {
  secret: "mysecret",
});

// decorator de autenticacao
app.decorate("authenticate", async (request: any, response: any) => {
  try {
    await request.jwtVerify();
  } catch (error) {
    console.log(error);
    response.code(401).send({ error: "Authentication failed" });
  }
});

app.get(
  "/connection",
  async (request: FastifyRequest, response: FastifyReply) => {
    response.code(200);
  }
);

app.register(Routes);

app
  .listen({
    port: PORT,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
