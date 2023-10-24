import { Request, Response, Router } from "express";
const accountRouter = Router();

accountRouter.get("/", async (request: Request, response: Response) => {
  try {
    response.status(200).send("Test works");
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({
        isSuccessful: false,
        message: "Server error, please contact the admin",
      });
  }
});

export default accountRouter;
