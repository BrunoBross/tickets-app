import { FastifyInstance } from "fastify";
import { z } from "zod";
import { UserService } from "../services/user/UserService";
import { ServerResponseError } from "../helpers/ServerResponseError";
import { createUserBody } from "../types/UserTypes";

const userService = new UserService();

export async function UserController(app: FastifyInstance) {
  app.get("/user", async (request, response) => {
    try {
      const userQuery = z.object({
        filter: z.string().default("active"),
      });
      const { filter } = userQuery.parse(request.query);

      const users = await userService.getAllUsers(filter);

      return response.send(users);
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });

  app.get("/user/findById/:userId", async (request, response) => {
    try {
      const findUserByIdParams = z.object({
        userId: z.string(),
      });
      const { userId } = findUserByIdParams.parse(request.params);

      const user = await userService.findUserById(userId);

      response.send(user);
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });

  app.get("/user/findByCpf/:userCpf", async (request, response) => {
    try {
      const findUserByCpfParams = z.object({
        userCpf: z.string(),
      });
      const { userCpf } = findUserByCpfParams.parse(request.params);

      const user = await userService.findUserByCpf(userCpf);

      return response.send(user);
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });

  app.get("/user/findByEmail/:userEmail", async (request, response) => {
    try {
      const findUserByEmailParams = z.object({
        userEmail: z.string(),
      });
      const { userEmail } = findUserByEmailParams.parse(request.params);

      const user = await userService.findUserByEmail(userEmail);

      return response.send(user);
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });

  app.delete("/user/deleteById/:userId", async (request, response) => {
    try {
      const deleteUserByIdParams = z.object({
        userId: z.string(),
      });
      const { userId } = deleteUserByIdParams.parse(request.params);

      const result = await userService.deleteUserById(userId);

      return response.status(result.status).send();
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });

  app.post("/user", async (request, response) => {
    try {
      const parsedCreateUserBody = createUserBody.parse(request.body);

      const result = await userService.createUser(parsedCreateUserBody);

      return response.status(result.status).send({ message: result.message });
    } catch (error) {
      return ServerResponseError(error, response);
    }
  });
}
