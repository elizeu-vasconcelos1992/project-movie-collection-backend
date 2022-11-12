import { hash } from "bcryptjs";
import { AppError } from "../../errors";
import AppDataSource from "../../data-source";
import { IUser, IUserRequest } from "../../interfaces/users";
import { Users } from "../../entities/users";

export default async function createUserService(
  user: IUserRequest
): Promise<IUser> {
  const userData = AppDataSource.getRepository(Users);

  const users = await userData.find();

  const userExists = users.some(userTest => userTest.email === user.email);

  if (userExists) {
    throw new AppError("This email is already registered");
  }

  const hashPassword = await hash(user.password, 10);

  const newUser = userData.create({
    name: user.name,
    email: user.email,
    password: hashPassword,
  });

  await userData.save(newUser);

  return newUser;
}
