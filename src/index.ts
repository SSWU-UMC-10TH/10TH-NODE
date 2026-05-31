import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import passport from "passport";
import fs from "fs";
import path from "path";
import { RegisterRoutes } from "./generated/routes.js";
import {
  errorHandler,
  notFoundHandler,
} from "./common/middlewares/error-handler.js";
import { authMiddleware } from "./common/middlewares/auth.js";
import { successResponse } from "./common/response.js";
import { configurePassport } from "./auth.config.js";

dotenv.config();
const isGoogleLoginEnabled = configurePassport();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(compression({ threshold: 512 }));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

const swaggerFile = JSON.parse(
  fs.readFileSync(path.resolve("dist/swagger.json"), "utf8")
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (_req: Request, res: Response) => {
  res.json(successResponse("COMMON200", "Hello World! This is TypeScript Server!"));
});

const router = express.Router();

if (isGoogleLoginEnabled) {
  router.get("/auth/google", passport.authenticate("google", { session: false }));
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      session: false,
      failureRedirect: "/api/v1/auth/google/failure",
    }),
    (req: Request, res: Response) => {
      res.json(successResponse("COMMON200", req.user, "Google 로그인에 성공했습니다."));
    }
  );
} else {
  router.get("/auth/google", (_req: Request, res: Response) => {
    res.status(503).json({
      isSuccess: false,
      code: "AUTH503",
      message: "Google 로그인 환경 변수가 설정되지 않았습니다.",
      result: null,
    });
  });
}
router.get("/auth/google/failure", (_req: Request, res: Response) => {
  res.status(401).json({
    isSuccess: false,
    code: "AUTH401",
    message: "Google 로그인에 실패했습니다.",
    result: null,
  });
});

router.post("/stores/:storeId/reviews", authMiddleware);
router.post("/stores/:storeId/missions", authMiddleware);
router.get("/reviews/my", authMiddleware);
router.patch("/missions/:userMissionId/complete", authMiddleware);
router.patch("/users/missions/:missionId", authMiddleware);
router.get("/users/me", authMiddleware);
router.patch("/users/me", authMiddleware);

RegisterRoutes(router);
app.use("/api/v1", router);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
