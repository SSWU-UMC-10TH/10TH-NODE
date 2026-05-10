import { completeMission } from "../repositories/store.repository.js";
import {
  getMyReviews,
  getMissionsByStoreId,
} from "../repositories/store.repository.js";
import { addMission } from "../repositories/store.repository.js";
import { AddMissionRequest } from "../dtos/store.dto.js";
import { AddReviewRequest } from "../dtos/store.dto.js";
import { addReview, getStoreById } from "../repositories/store.repository.js";

export const createReview = async (
  storeId: number,
  data: AddReviewRequest
) => {
  const stores = await getStoreById(storeId);

  if (stores.length === 0) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  await addReview(data.userId, storeId, data.rating, data.content);
};

export const createMission = async (
  storeId: number,
  data: AddMissionRequest
) => {
  const stores = await getStoreById(storeId);

  if (stores.length === 0) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  await addMission(
    storeId,
    data.title,
    data.description,
    data.rewardPoint,
    data.deadline
  );
};

export const getMyReviewsService = async (userId: number, cursor?: number) => {
  return await getMyReviews(userId, cursor);
};

export const getMissionsByStoreService = async (storeId: number) => {
  return await getMissionsByStoreId(storeId);
};

export const completeMissionService = async (userMissionId: number) => {
  return await completeMission(userMissionId);
};