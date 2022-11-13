import AppDataSource from "../../data-source";
import { Users } from "../../entities/users";
import { AppError } from "../../errors";
import { IUser } from "../../interfaces/users";

export default async function listUserServices(userId: string): Promise<IUser> {
  const userData = AppDataSource.getRepository(Users);

  const user = await userData.findOne({
    where: { id: userId },
    relations: { userMovies: true, userMoviesCategories: true },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
}
