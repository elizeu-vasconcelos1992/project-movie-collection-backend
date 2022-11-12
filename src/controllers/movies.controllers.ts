import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IMovieRequest, IMovieUpdate } from "../interfaces/movies";
import createMovieService from "../services/movies/createMovieUser.service";
import deleteMovieUserServices from "../services/movies/deleteMovieUser.service";
import listMoviesUserServices from "../services/movies/listMoviesUser.service";
import listMoviesUserByCategotyService from "../services/movies/listMoviesUserByCategory.service";
import updateMovieUserServices from "../services/movies/updateMovieUser.service";

async function createMovieController(req: Request, res: Response) {
  const movie: IMovieRequest = req.body;
  const userId = req.params.id;
  const newMovie = await createMovieService(movie, userId);
  return res.status(201).json({ data: instanceToPlain(newMovie) });
}

async function listMoviesUserController(req: Request, res: Response) {
  const userId = req.params.id;
  const movies = await listMoviesUserServices(userId);
  return res.status(200).json({ data: movies });
}

async function listMoviesUserByCategoryController(req: Request, res: Response) {
  const categoryId = req.params.id;
  const movies = await listMoviesUserByCategotyService(categoryId);
  return res.status(200).json({ data: instanceToPlain(movies) });
}

async function updateMoviesUserController(req: Request, res: Response) {
  const movie: IMovieUpdate = req.body;
  const movieId = req.params.id;
  const updateMovie = await updateMovieUserServices(movie, movieId);
  return res.status(200).json({ data: updateMovie });
}

async function deleteMoviesUserController(req: Request, res: Response) {
  const movieId = req.params.id;
  await deleteMovieUserServices(movieId);
  return res.status(204).send();
}

export {
  createMovieController,
  listMoviesUserController,
  listMoviesUserByCategoryController,
  updateMoviesUserController,
  deleteMoviesUserController,
};
