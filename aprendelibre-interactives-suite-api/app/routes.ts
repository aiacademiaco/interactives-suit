import { Router } from "express";
import coursesRouter from "./courses/courses.controller";

const routes = Router();

routes.use("/coursesTest", coursesRouter);

export default routes;
