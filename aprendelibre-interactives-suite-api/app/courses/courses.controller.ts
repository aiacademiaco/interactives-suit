import { Router, Request, Response, NextFunction } from "express";

const couresRouter = Router();

couresRouter.get("/", async (request: Request, response: Response) => {
  try {
    response.status(200).send({ courses: true });
  } catch (error) {
    console.error(error);

    response
      .status(500)
      .send({ message: "error consulting the careers data", error });
  }
});

export default couresRouter;
