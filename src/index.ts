import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";

// 컨트롤러 및 라우터 불러오기
import { handleUserSignUp, handleListUserReviews, handleUserOngoingMissionsGet, handleUserMissionCompletePatch } from "./modules/users/controllers/user.controller.js";
import { storeRouter, regionRouter } from "./modules/stores/store.route.js";
import { handleListStoreReviews } from "./modules/stores/controllers/store.controller.js";

// 1. 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// 2. 미들웨어 설정
app.use(cors());                                  // CORS 방식 허용
app.use(express.static('public'));                // 정적 파일 접근
app.use(express.json());                          // JSON 형태의 요청 바디 파싱
app.use(express.urlencoded({ extended: false })); // 본문 데이터 해석

// ==========================================================
// 3. 라우터 및 API 경로 설정
// ==========================================================

// [가게 및 지역 관련 라우터 연결]
app.use("/api/v1/stores", storeRouter);
app.use("/api/v1/regions", regionRouter);

// [유저 관련 API 및 라우터 설정]
// (회원가입 및 유저 리뷰 조회)
app.post("/api/v1/users/signup", handleUserSignUp);
app.get("/api/v1/users/:userId/reviews", handleListUserReviews);

// [3번 & 4번] 유저 미션 관련 전용 라우터 생성 및 연결
export const userRouter = express.Router();

// 3번 API: 특정 유저의 진행 중인 미션 목록 조회
userRouter.get('/:userId/missions/ongoing', handleUserOngoingMissionsGet);
// 4번 API: 특정 유저 미션의 상태를 완료로 변경 (PATCH)
userRouter.patch('/missions/:userMissionId/complete', handleUserMissionCompletePatch);

// ★ 핵심 수정: 생성한 userRouter를 메인 app에 최종 주입 연결!
app.use("/api/v1/users", userRouter);


// [기타 기본 라우트]
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

// 특정 가게 리뷰 조회 API 연결
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);


// ==========================================================
// 4. 에러 핸들링 미들웨어 (app.listen 바로 직전에 위치)
// ==========================================================
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "서버 내부 오류가 발생했습니다."
  });
});


// ==========================================================
// 5. 서버 시작
// ==========================================================
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});