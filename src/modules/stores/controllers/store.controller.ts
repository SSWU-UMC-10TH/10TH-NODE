import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  bodyToStore,
  bodyToReview,
  bodyToMission,
  paramsToUserMission,
  StoreCreateRequest,
  ReviewCreateRequest,
  MissionCreateRequest
} from "../dtos/store.dto.js";

import { 
  createStore, 
  createReview, 
  createMission, 
  createUserMission,
  listStoreReviews
} from "../services/store.service.js";


// ==========================================================
// [1-1] 특정 지역에 가게 추가하기
// ==========================================================
export const handleStoreCreate = async (req: Request, res: Response, next: any) => {
  try {
    // 1. 주소(URL)에서 regionId를 뽑아옵니다.
    const regionId = parseInt(req.params.regionId as string);
    
    // 2. DTO를 사용해서 클라이언트가 보낸 Body 데이터를 예쁘게 포장합니다.
    const storeData = bodyToStore(req.body as StoreCreateRequest);
    const result = await createStore(storeData, regionId);
    res.status(200).json({ message: "가게 추가 완료!", data: storeData });
  } catch (error) {
    next(error);
  }
};

// ==========================================================
// [1-2] 가게에 리뷰 추가하기 (⭐ 필수)
// ==========================================================
export const handleReviewCreate = async (req: Request, res: Response, next: any) => {
  try {
    const storeId = parseInt(req.params.storeId as string);
    const reviewData = bodyToReview(req.body as ReviewCreateRequest, storeId);
    const result = await createReview(reviewData, storeId);

    /* TODO: Service 호출 부분 */

    res.status(200).json({ message: "리뷰 추가 컨트롤러 호출 성공!" });
  } catch (error) {
    next(error);
  }
};

// ==========================================================
// [1-3] 가게에 미션 추가하기
// ==========================================================
export const handleMissionCreate = async (req: Request, res: Response, next: any) => {
  try {
    const storeId = parseInt(req.params.storeId as string);
    const missionData = bodyToMission(req.body as MissionCreateRequest, storeId);
    const result = await createMission(missionData, storeId);

    /* TODO: Service 호출 부분 */

    res.status(200).json({ message: "미션 추가 컨트롤러 호출 성공!" });
  } catch (error) {
    next(error);
  }
};

// ==========================================================
// [1-4] 미션 도전하기 (⭐ 필수)
// ==========================================================
export const handleUserMissionCreate = async (req: Request, res: Response, next: any) => {
  try {
    // Path 파라미터에서 유저 ID와 미션 ID를 둘 다 뽑아옵니다.
    const userId = parseInt(req.params.userId as string);
    const missionId = parseInt(req.params.missionId as string);
    
    // DTO를 사용해서 포장합니다. (Body 데이터는 없으므로 안 넘깁니다!)
    const userMissionData = paramsToUserMission(userId, missionId);
    const result = await createUserMission(userMissionData); // 서비스 호출!
    /* TODO: Service 호출 부분 */

    res.status(200).json({ message: "미션 도전 컨트롤러 호출 성공!" });
  } catch (error) {
    next(error);
  }
};

export const handleListStoreReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const storeId = parseInt(req.params.storeId as string, 10);
    const cursor =
    typeof req.query.cursor === "string"
      ? parseInt(req.query.cursor, 10)
      : 0;

    const reviews = await listStoreReviews(storeId, cursor);

    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    next(err);
  }
};

// 스토어 서비스에서 조회 함수를 가져옵니다 (아래에서 만들 예정)
import { getStoreMissions } from "../services/store.service.js";

export const handleStoreMissionsGet = async (req: Request, res: Response, next: any) => {
    try {
        const storeId = parseInt(req.params.storeId as string);
        
        // 쿼리 스트링에서 커서와 사이즈를 파싱합니다. (값이 없으면 기본값 설정)
        const cursor = req.query.cursor ? parseInt(req.query.cursor as string) : null;
        const size = req.query.size ? parseInt(req.query.size as string) : 10;

        // 비즈니스 로직(Service) 호출
        const result = await getStoreMissions(storeId, cursor, size);

        // 성공 응답 반환
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error); // 에러 핸들러 미들웨어로 던지기
    }
};