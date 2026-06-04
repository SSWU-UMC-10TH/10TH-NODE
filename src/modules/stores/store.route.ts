import express from "express";
import {
  handleStoreCreate,
  handleReviewCreate,
  handleMissionCreate,
} from "./controllers/store.controller.js";

export const storeRouter = express.Router();
export const regionRouter = express.Router();

// ==========================================================
// [1-2, 1-3] 가게 관련 API (기본 주소: /api/v1/stores)
// ==========================================================
// 리뷰 추가
storeRouter.post("/:storeId/reviews", handleReviewCreate);
// 미션 추가
storeRouter.post("/:storeId/missions", handleMissionCreate);

// ==========================================================
// [1-1] 지역 관련 API (기본 주소: /api/v1/regions)
// ==========================================================
// 특정 지역에 가게 추가
regionRouter.post("/:regionId/stores", handleStoreCreate);

import { handleStoreMissionsGet } from "./controllers/store.controller.js";

// 특정 가게의 미션 목록 조회 라우트 연결
storeRouter.get('/:storeId/missions', handleStoreMissionsGet);