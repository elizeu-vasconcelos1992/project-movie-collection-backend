import { Router } from "express";
import {
  createMovieController,
  deleteMoviesUserController,
  listMoviesUserByCategoryController,
  listMoviesUserController,
  updateMoviesUserController,
} from "../controllers/movies.controllers";
import { createUserController } from "../controllers/users.controllers";
import checkAuthUserMiddleware from "../middlewares/checkAuthUser.middleware";

const userRoutes = Router();

userRoutes.post("", createUserController);

userRoutes.post("/movies/:id", checkAuthUserMiddleware, createMovieController);

userRoutes.get(
  "/movies/:id",
  checkAuthUserMiddleware,
  listMoviesUserController
);

userRoutes.get(
  "/movies/categories/:id",
  checkAuthUserMiddleware,
  listMoviesUserByCategoryController
);

userRoutes.patch(
  "/movies/:id",
  checkAuthUserMiddleware,
  updateMoviesUserController
);

userRoutes.delete(
  "/movies/:id",
  checkAuthUserMiddleware,
  deleteMoviesUserController
);

export default userRoutes;
