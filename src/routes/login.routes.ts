import { Router } from "express";
import { loginController } from "../controllers/users.controllers";

const loginRoutes = Router();

loginRoutes.post("", loginController);

export default loginRoutes;
