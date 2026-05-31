import { StatusCodes } from "http-status-codes";
import { throwError } from "../../../common/errors.js";
import { MISSION_STATUS } from "../enums/mission-status.enum.js";
import {
  addUserMission,
  getMissionById,
  getUserMission,
} from "../repositories/mission.repository.js";

export const challengeMission = async (
  userId: number,
  missionId: number
) => {
  if (!Number.isInteger(userId) || userId <= 0) {
    throwError(StatusCodes.BAD_REQUEST, "USER400", "올바른 사용자 ID가 필요합니다.");
  }

  if (!Number.isInteger(missionId) || missionId <= 0) {
    throwError(StatusCodes.BAD_REQUEST, "MISSION400", "올바른 미션 ID가 필요합니다.");
  }

  const mission = await getMissionById(missionId);

  if (!mission) {
    throwError(StatusCodes.NOT_FOUND, "MISSION404", "존재하지 않는 미션입니다.");
  }

  const userMission = await getUserMission(userId, missionId);

  if (userMission?.status === MISSION_STATUS.COMPLETE) {
    throwError(StatusCodes.CONFLICT, "MISSION409", "이미 완료한 미션입니다.");
  }

  if (userMission) {
    throwError(StatusCodes.CONFLICT, "MISSION409", "이미 진행 중인 미션입니다.");
  }

  await addUserMission(userId, missionId);
};
