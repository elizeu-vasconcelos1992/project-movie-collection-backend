import AppDataSource from "../../data-source";
import { Users } from "../../entities/users";
import { AppError } from "../../errors";

export default async function listMoviesUserServices(userId: string) {
  const userData = AppDataSource.getRepository(Users);

  const moviesUser = await userData.find({
    where: { id: userId },
    relations: { userMovies: true },
  });

  if (moviesUser.length === 0) {
    throw new AppError("User not found", 404);
  }

  const movies = moviesUser.map(movie => movie.userMovies);

  if (movies[0].length === 0) {
    throw new AppError("Movie not found", 404);
  }

  return movies;
}
