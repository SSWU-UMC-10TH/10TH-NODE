import { StatusCodes } from "http-status-codes";
import { throwError } from "../../../common/errors.js";
import { ChallengeMissionRequest } from "../dtos/mission.dto.js";
import { MISSION_STATUS } from "../enums/mission-status.enum.js";
import {
  addUserMission,
  getMissionById,
  getUserMission,
} from "../repositories/mission.repository.js";

export const challengeMission = async (
  missionId: number,
  data: ChallengeMissionRequest
) => {
  if (!Number.isInteger(missionId) || missionId <= 0) {
    throwError(StatusCodes.BAD_REQUEST, "MISSION400", "올바른 미션 ID가 필요합니다.");
  }

  // 피드백 반영: falsy 검사 대신 사용자 ID의 정수/양수 범위를 확인합니다.
  if (!Number.isInteger(data.userId) || data.userId <= 0) {
    throwError(StatusCodes.BAD_REQUEST, "USER400", "올바른 사용자 ID가 필요합니다.");
  }

  const mission = await getMissionById(missionId);

  // 피드백 반영 수정: Prisma findUnique 반환값(null)을 기준으로 기존 조회 로직과 동일하게 존재 여부를 판단합니다.
  if (!mission) {
    throwError(StatusCodes.NOT_FOUND, "MISSION404", "존재하지 않는 미션입니다.");
  }

  const userMission = await getUserMission(data.userId, missionId);

  // 피드백 반영 수정: 완료된 미션 재도전은 "도전 중"과 구분해 이미 완료된 미션 예외로 처리합니다.
  if (userMission?.status === MISSION_STATUS.COMPLETE) {
    throwError(StatusCodes.CONFLICT, "MISSION409", "이미 완료된 미션입니다.");
  }

  // 피드백 반영 수정: Prisma findFirst 반환값(null)을 기준으로 기존 중복 도전 방지 로직과 동일하게 판단합니다.
  if (userMission) {
    throwError(StatusCodes.CONFLICT, "MISSION409", "이미 도전 중인 미션입니다.");
  }

  await addUserMission(data.userId, missionId);
};
