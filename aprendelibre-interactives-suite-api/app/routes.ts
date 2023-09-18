import { Router } from "express";
import coursesRouter from "./courses/courses.controller";

const routes = Router();

routes.use("/courses", coursesRouter);

export default routes;
