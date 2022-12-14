import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories";
import { AppError } from "../../errors";

export default async function listMoviesUserByCategotyService(
  categoryId: string
) {
  const listMoviesByCategory = AppDataSource.getRepository(Categories);

  const moviesByCategory = await listMoviesByCategory.find({
    where: { id: categoryId },
    relations: { categoryMovies: true },
  });

  if (moviesByCategory.length === 0) {
    throw new AppError("Movie not found on category", 404);
  }

  return moviesByCategory;
}
