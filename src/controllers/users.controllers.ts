import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { IUserLogin, IUserRequest } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import loginService from "../services/login/createLogin.service";
import listUserServices from "../services/users/listUser.service";

async function createUserController(req: Request, res: Response) {
  const user: IUserRequest = req.body;
  const newUser = await createUserService(user);
  return res.status(201).json({ data: instanceToPlain(newUser) });
}

async function listUserController(req: Request, res: Response) {
  const userId = req.params.id;
  const user = await listUserServices(userId);
  return res.status(200).json({ data: instanceToPlain(user) });
}

async function loginController(req: Request, res: Response) {
  const user: IUserLogin = req.body;
  const response = await loginService(user);
  return res.status(200).json({ data: response });
}

export { createUserController, listUserController, loginController };
