import AppDataSource from "../../data-source";
import { Movies } from "../../entities/movies";
import { AppError } from "../../errors";
import { IMovieUpdate } from "../../interfaces/movies";

export default async function updateMovieUserServices(
  movie: IMovieUpdate,
  movieId: string
): Promise<string> {
  if (movie.image) {
    let checkReleaseJpg = movie.image.includes(".jpg");
    let checkReleasePng = movie.image.includes(".png");
    let checkReleaseJpeg = movie.image.includes(".jpeg");

    if (
      checkReleaseJpg === false &&
      checkReleasePng === false &&
      checkReleaseJpeg === false
    ) {
      throw new AppError("Invalid url image");
    }
  }

  if (movie.name) {
    if (movie.name.length > 50) {
      throw new AppError("Name must be up to 50 characters");
    }
  }

  if (movie.image) {
    if (movie.image.length > 120) {
      throw new AppError("Image url must be up to 120 characters");
    }
  }

  if (movie.sinopse) {
    if (movie.sinopse.length > 400) {
      throw new AppError("Sinopse must be up to 400 characters");
    }
  }

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
