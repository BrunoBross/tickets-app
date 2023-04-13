import Fastify, { FastifyInstance } from "fastify";
import { Routes } from "./routes";
import Cors from "@fastify/cors";
import Jwt from "@fastify/jwt";
import { multerUpload } from "./lib/multer";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

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

const app: FastifyInstance = Fastify();
const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

app.register(multerUpload.contentParser);

app.register(require("@fastify/static"), {
  root: path.join(__dirname, "/lib/uploads"),
  prefix: "/uploads/logo/",
});

app.register(Cors);

app.register(Jwt, {
  secret: JWT_SECRET,
});

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
    console.error(error);
    process.exit(1);
  });
