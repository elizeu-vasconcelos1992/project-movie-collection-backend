import AppDataSource from "../../data-source";
import { Movies } from "../../entities/movies";
import { AppError } from "../../errors";

export default async function deleteMovieUserServices(
  movieId: string
): Promise<void> {
  const movieData = AppDataSource.getRepository(Movies);

  const movieExists = await movieData.findOneBy({
    id: movieId,
  });

  if (!movieExists) {
    throw new AppError("Movie not found", 404);
  }

  await movieData.delete(movieId);
}
