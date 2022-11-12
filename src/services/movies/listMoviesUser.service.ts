import AppDataSource from "../../data-source";
import { Movies } from "../../entities/movies";
import { Users } from "../../entities/users";
import { AppError } from "../../errors";

export default async function listMoviesUserServices(userId: string) {
  const userData = AppDataSource.getRepository(Users);

  const moviesUser = await userData.find({
    where: { id: userId },
    relations: { userMovies: true },
  });

  if (!moviesUser) {
    throw new AppError("User not found", 404);
  }

  const movies = moviesUser.map(movie => movie.userMovies);

  if (!movies) {
    throw new AppError("Movie not found", 404);
  }

  return movies;
}
