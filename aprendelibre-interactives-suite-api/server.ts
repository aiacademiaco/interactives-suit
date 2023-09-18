/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express, { Request, Response } from "express";
import routes from "./app/routes";
import cors from "cors";

const path = require("path");
var bodyParser = require("body-parser");

const app = express();

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json

const STATIC = path.resolve(__dirname, "web");
const INDEX = path.resolve(STATIC, "index.html");

//

// Static content
app.use(express.static(STATIC));

// All GET request handled by INDEX file
app.get("/", function (req, res) {
  res.sendFile(INDEX);
});

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.contentType("application/json");
  next();
});

app.use(cors());

app.use("/api", routes);

const port = process.env.port || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
