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

export const createReview = async (storeId: number, data: AddReviewRequest) => {
  ensurePositiveNumber(storeId, "STORE400", "올바른 가게 ID가 필요합니다.");

  if (!data.userId || !data.rating || !data.content) {
    throwError(StatusCodes.BAD_REQUEST, "REVIEW400", "리뷰 필수 값이 누락되었습니다.");
  }

  const store = await getStoreById(storeId);

  // 피드백 반영 수정: Prisma findUnique 반환값(null)을 기준으로 기존 조회 로직과 동일하게 존재 여부를 판단합니다.
  if (!store) {
    throwError(StatusCodes.NOT_FOUND, "STORE404", "존재하지 않는 가게입니다.");
  }

  await addReview(data.userId, storeId, data.rating, data.content);
};

export const createMission = async (
  storeId: number,
  data: AddMissionRequest
) => {
  ensurePositiveNumber(storeId, "STORE400", "올바른 가게 ID가 필요합니다.");

  if (!data.title || !data.description || !data.rewardPoint || !data.deadline) {
    throwError(StatusCodes.BAD_REQUEST, "MISSION400", "미션 필수 값이 누락되었습니다.");
  }

  const store = await getStoreById(storeId);

  // 피드백 반영 수정: Prisma findUnique 반환값(null)을 기준으로 기존 조회 로직과 동일하게 존재 여부를 판단합니다.
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

export const completeMissionService = async (userMissionId: number) => {
  ensurePositiveNumber(
    userMissionId,
    "MISSION400",
    "올바른 사용자 미션 ID가 필요합니다."
  );

  const userMission = await getUserMissionById(userMissionId);

  if (userMission === null) {
    throwError(StatusCodes.NOT_FOUND, "MISSION404", "도전 중인 미션을 찾을 수 없습니다.");
  }

  const missionToComplete = userMission!;

  // 피드백 반영 수정: 이미 완료된 미션 재요청은 409 Conflict로 명확하게 응답합니다.
  if (missionToComplete.status === MISSION_STATUS.COMPLETE) {
    throwError(StatusCodes.CONFLICT, "MISSION409", "이미 완료된 미션입니다.");
  }

  // 피드백 반영 수정: Prisma 전환 후에도 상태 변경 동작이 안전하도록 조건부 updateMany로 한 번 더 보호합니다.
  const result = await completeMissionIfNotCompleted(userMissionId);

  if (result.count === 0) {
    throwError(StatusCodes.CONFLICT, "MISSION409", "이미 완료된 미션입니다.");
  }

  return await getUserMissionById(userMissionId);
};
