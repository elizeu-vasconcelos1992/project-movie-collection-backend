import AppDataSource from "../../data-source";
import { Movies } from "../../entities/movies";
import { AppError } from "../../errors";
import { IMovieUpdate } from "../../interfaces/movies";

export default async function updateMovieUserServices(
  movie: IMovieUpdate,
  movieId: string
): Promise<string> {
  const movieData = AppDataSource.getRepository(Movies);

  const movieExists = await movieData.findOneBy({
    id: movieId,
  });

  if (!movieExists) {
    throw new AppError("Movie not found", 404);
  }

  if (movie.release) {
    const newDate = new Date(
      Date.UTC(
        parseInt(movie.release.split("-")[0]),
        parseInt(movie.release.split("-")[1]) - 1,
        parseInt(movie.release.split("-")[2])
      )
    );

    await movieData.update(movieId, {
      release: newDate.toISOString(),
    });
  }

  await movieData.update(movieId, {
    name: movie.name ? movie.name : movieExists.name,
    image: movie.image ? movie.image : movieExists.image,
    sinopse: movie.sinopse ? movie.sinopse : movieExists.sinopse,
  });

  return "Movie successfully updated";
}
