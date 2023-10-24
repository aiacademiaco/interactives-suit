import { Router } from "express";
import testRouter from "./test-api/test-api.controller";
export const routes = Router();
routes.use("/test", testRouter);

export default routes;
