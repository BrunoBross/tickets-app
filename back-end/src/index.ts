import Fastify from "fastify";
import { Routes } from "./routes";
import Cors from "@fastify/cors";
import Jwt from "@fastify/jwt";

const app = Fastify();
const PORT = 3001;

app.register(Cors);

app.register(Jwt, {
  secret: "mysecret",
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
    console.log(error);
    process.exit(1);
  });
