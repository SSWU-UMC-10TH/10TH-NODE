import { completeMissionService } from "../services/store.service.js";
import { Request, Response } from "express";
import {
  getMyReviewsService,
  getMissionsByStoreService,
  createReview,
  createMission,
} from "../services/store.service.js";
import { responseFromReviews } from "../dtos/store.dto.js";

export const handleAddReview = async (req: Request, res: Response) => {
  const storeId = Number(req.params.storeId);

  await createReview(storeId, req.body);

  res.status(200).json({
    message: "리뷰 등록 완료",
  });
};



export const handleAddMission = async (req: Request, res: Response) => {
  const storeId = Number(req.params.storeId);

  await createMission(storeId, req.body);

  res.status(200).json({
    message: "미션 등록 완료",
  });
};

export const handleGetMyReviews = async (req: Request, res: Response) => {
  const userId = 1; // 일단 고정

  const cursor = req.query.cursor
    ? parseInt(req.query.cursor as string)
    : undefined;

  const reviews = await getMyReviewsService(userId, cursor);

  res.json(responseFromReviews(reviews));
};

export const handleGetStoreMissions = async (req: Request, res: Response) => {
const storeId = parseInt(req.params.storeId as string);

  const missions = await getMissionsByStoreService(storeId);

  res.json({ data: missions });
};

export const handleCompleteMission = async (req: Request, res: Response) => {
  const userMissionId = parseInt(req.params.userMissionId as string);

  await completeMissionService(userMissionId);

  res.json({ message: "미션 완료 처리 성공" });
};