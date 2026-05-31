import { StatusCodes } from "http-status-codes";
import { throwError } from "../../../common/errors.js";
import { MISSION_STATUS } from "../../missions/enums/mission-status.enum.js";
import { AddMissionRequest, AddReviewRequest } from "../dtos/store.dto.js";
import {
  addMission,
  addReview,
  completeMissionIfNotCompleted,
  getMissionsByStoreId,
  getMyReviews,
  getStoreById,
  getUserMissionById,
} from "../repositories/store.repository.js";

const ensurePositiveNumber = (value: number, code: string, message: string) => {
  if (!Number.isInteger(value) || value <= 0) {
    throwError(StatusCodes.BAD_REQUEST, code, message);
  }
};

const ensureNonEmptyString = (value: string, code: string, message: string) => {
  if (typeof value !== "string" || value.trim().length === 0) {
    throwError(StatusCodes.BAD_REQUEST, code, message);
  }
};

const ensureRatingRange = (rating: number) => {
  if (typeof rating !== "number" || !Number.isFinite(rating) || rating < 0 || rating > 5) {
    throwError(StatusCodes.BAD_REQUEST, "REVIEW400", "리뷰 평점은 0 이상 5 이하이어야 합니다.");
  }
};

const ensureRewardPointRange = (rewardPoint: number) => {
  if (!Number.isInteger(rewardPoint) || rewardPoint < 0) {
    throwError(StatusCodes.BAD_REQUEST, "MISSION400", "미션 보상 포인트는 0 이상의 정수이어야 합니다.");
  }
};

export const createReview = async (
  userId: number,
  storeId: number,
  data: AddReviewRequest
) => {
  ensurePositiveNumber(userId, "USER400", "올바른 사용자 ID가 필요합니다.");
  ensurePositiveNumber(storeId, "STORE400", "올바른 가게 ID가 필요합니다.");
  ensureRatingRange(data.rating);
  ensureNonEmptyString(data.content, "REVIEW400", "리뷰 내용이 필요합니다.");

  const store = await getStoreById(storeId);

  if (!store) {
    throwError(StatusCodes.NOT_FOUND, "STORE404", "존재하지 않는 가게입니다.");
  }

  await addReview(userId, storeId, data.rating, data.content);
};

export const createMission = async (
  storeId: number,
  data: AddMissionRequest
) => {
  ensurePositiveNumber(storeId, "STORE400", "올바른 가게 ID가 필요합니다.");
  ensureNonEmptyString(data.title, "MISSION400", "미션 제목이 필요합니다.");
  ensureNonEmptyString(data.description, "MISSION400", "미션 설명이 필요합니다.");
  ensureRewardPointRange(data.rewardPoint);
  ensureNonEmptyString(data.deadline, "MISSION400", "미션 마감일이 필요합니다.");

  const store = await getStoreById(storeId);

  if (!store) {
    throwError(StatusCodes.NOT_FOUND, "STORE404", "존재하지 않는 가게입니다.");
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
  ensurePositiveNumber(userId, "USER400", "올바른 사용자 ID가 필요합니다.");

  if (cursor !== undefined && (!Number.isInteger(cursor) || cursor <= 0)) {
    throwError(StatusCodes.BAD_REQUEST, "REVIEW400", "올바른 커서 값이 필요합니다.");
  }

  return await getMyReviews(userId, cursor);
};

export const getMissionsByStoreService = async (storeId: number) => {
  ensurePositiveNumber(storeId, "STORE400", "올바른 가게 ID가 필요합니다.");
  return await getMissionsByStoreId(storeId);
};

export const completeMissionService = async (
  userId: number,
  userMissionId: number
) => {
  ensurePositiveNumber(userId, "USER400", "올바른 사용자 ID가 필요합니다.");
  ensurePositiveNumber(userMissionId, "MISSION400", "올바른 사용자 미션 ID가 필요합니다.");

  const userMission = await getUserMissionById(userMissionId);

  if (userMission === null || userMission.userId !== userId) {
    throwError(StatusCodes.NOT_FOUND, "MISSION404", "진행 중인 미션을 찾을 수 없습니다.");
  }

  const missionToComplete = userMission!;

  if (missionToComplete.status === MISSION_STATUS.COMPLETE) {
    throwError(StatusCodes.CONFLICT, "MISSION409", "이미 완료한 미션입니다.");
  }

  const result = await completeMissionIfNotCompleted(userMissionId);

  if (result.count === 0) {
    throwError(StatusCodes.CONFLICT, "MISSION409", "이미 완료한 미션입니다.");
  }

  return await getUserMissionById(userMissionId);
};
