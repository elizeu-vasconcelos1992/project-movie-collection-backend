import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors";
import { IUserLogin, IUserLoginResponse } from "../../interfaces/users";
import { Users } from "../../entities/users";

export default async function loginService(
  user: IUserLogin
): Promise<IUserLoginResponse> {
  const dataUser = AppDataSource.getRepository(Users);

  const userExists = await dataUser.findOneBy({
    email: user.email,
  });

  if (!userExists) {
    throw new AppError("Invalid user or password", 403);
  }

  const passwordExists = await compare(user.password, userExists.password);

  if (!passwordExists) {
    throw new AppError("Invalid user or password", 403);
  }

  const token = jwt.sign({}, process.env.SECRET_KEY as string, {
    expiresIn: "24h",
    subject: userExists.id,
  });

  const response = { id: userExists.id, token: token };

  return response;
}
