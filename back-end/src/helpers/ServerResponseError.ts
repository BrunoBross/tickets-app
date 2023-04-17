import { FastifyReply } from "fastify";

interface ErrorInterface {
  message?: string;
  status?: number;
}

export const ServerResponseError = (
  error: ErrorInterface,
  response: FastifyReply
) => {
  const message = error.message ? error.message : "Ocorreu um erro interno";
  const status = error.status ? error.status : 500;

  console.error({
    error: error.message,
    status: error.status,
    type: "ServerResponseError",
  });
  return response.status(status).send({ error: message });
};
