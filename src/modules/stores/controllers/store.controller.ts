import { Request, Response } from "express";
import {
  bodyToStore,
  bodyToReview,
  bodyToMission,
  paramsToUserMission,

  StoreCreateRequest,
  ReviewCreateRequest,
  MissionCreateRequest
} from "../dtos/store.dto.js";

// ==========================================================
// [1-1] 특정 지역에 가게 추가하기
// ==========================================================
export const handleStoreCreate = async (req: Request, res: Response, next: any) => {
  try {
    // 1. 주소(URL)에서 regionId를 뽑아옵니다.
    const regionId = parseInt(req.params.regionId as string);
    
    // 2. DTO를 사용해서 클라이언트가 보낸 Body 데이터를 예쁘게 포장합니다.
    const storeData = bodyToStore(req.body as StoreCreateRequest);

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
    const reviewData = bodyToReview(req.body, storeId);

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
    const missionData = bodyToMission(req.body, storeId);

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

    /* TODO: Service 호출 부분 */

    res.status(200).json({ message: "미션 도전 컨트롤러 호출 성공!" });
  } catch (error) {
    next(error);
  }
};