import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
import { RegisterRoutes } from "./generated/routes.js";
import {
  errorHandler,
  notFoundHandler,
} from "./common/middlewares/error-handler.js";
import { successResponse } from "./common/response.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(compression({ threshold: 512 }));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.json(successResponse("Hello World! This is TypeScript Server!"));
});

const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
