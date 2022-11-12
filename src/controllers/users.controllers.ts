import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { IUserLogin, IUserRequest } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import loginService from "../services/login/createLogin.service";

async function createUserController(req: Request, res: Response) {
  const user: IUserRequest = req.body;
  const newUser = await createUserService(user);
  return res.status(201).json({ data: instanceToPlain(newUser) });
}

async function loginController(req: Request, res: Response) {
  const user: IUserLogin = req.body;
  const response = await loginService(user);
  return res.status(200).json({ data: response });
}

export { createUserController, loginController };
