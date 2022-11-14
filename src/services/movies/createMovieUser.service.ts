import { AppError } from "../../errors";
import AppDataSource from "../../data-source";
import { IMovie, IMovieRequest } from "../../interfaces/movies";
import { Movies } from "../../entities/movies";
import { Categories } from "../../entities/categories";
import { Users } from "../../entities/users";

export default async function createMovieService(
  movie: IMovieRequest,
  userId: string
): Promise<IMovie> {
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

  if (movie.name.length > 50) {
    throw new AppError("Name must be up to 50 characters");
  }

  if (movie.image.length > 120) {
    throw new AppError("Image url must be up to 120 characters");
  }

  if (movie.sinopse.length > 400) {
    throw new AppError("Sinopse must be up to 400 characters");
  }

  const moviesData = AppDataSource.getRepository(Movies);

  const userData = AppDataSource.getRepository(Users);

  const moviesUser = await userData.findOne({
    where: { id: userId },
    relations: { userMovies: true },
  });

  if (!moviesUser) {
    throw new AppError("User not found", 404);
  }

  const movieExists = moviesUser.userMovies.some(
    movieTest =>
      movieTest.name === movie.name && movieTest.sinopse === movie.sinopse
  );

  if (movieExists) {
    throw new AppError("This movie is already registered");
  }

  const usersData = AppDataSource.getRepository(Users);

  const users = await usersData.find({
    relations: {
      userMoviesCategories: true,
    },
  });

  const user = users.find(user => user.id === userId);

  const userCategories = user!.userMoviesCategories.find(
    categorieTest => categorieTest.name === movie.category
  );

  if (userCategories) {
    const releaseDate = new Date(
      Date.UTC(
        parseInt(movie.release.split("-")[0]),
        parseInt(movie.release.split("-")[1]) - 1,
        parseInt(movie.release.split("-")[2])
      )
    );

    const newMovie = moviesData.create({
      name: movie.name,
      image: movie.image,
      release: releaseDate.toISOString(),
      sinopse: movie.sinopse,
      category: userCategories,
      user: user!,
    });

    await moviesData.save(newMovie);

    return newMovie;
  }

  const categoriesData = AppDataSource.getRepository(Categories);

  const newCategory = categoriesData.create({
    name: movie.category,
    user: user!,
  });

  await categoriesData.save(newCategory);

  const releaseDate = new Date(
    Date.UTC(
      parseInt(movie.release.split("-")[0]),
      parseInt(movie.release.split("-")[1]) - 1,
      parseInt(movie.release.split("-")[2])
    )
  );

  const newMovie = moviesData.create({
    name: movie.name,
    image: movie.image,
    release: releaseDate.toISOString(),
    sinopse: movie.sinopse,
    category: newCategory,
    user: user!,
  });

  await moviesData.save(newMovie);

  return newMovie;
}
