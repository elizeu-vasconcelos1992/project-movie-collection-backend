import "reflect-metadata";
import cors from "cors";
import express from "express";
import "express-async-errors";
import checkErrorMiddleware from "./middlewares/checkError.middleware";
import userRoutes from "./routes/users.routes";
import loginRoutes from "./routes/login.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", loginRoutes);

app.use(checkErrorMiddleware);

export default app;
