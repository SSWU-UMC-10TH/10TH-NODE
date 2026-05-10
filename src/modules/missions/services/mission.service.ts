import { ChallengeMissionRequest } from "../dtos/mission.dto.js";
import {
  addUserMission,
  getMissionById,
  getUserMission,
} from "../repositories/mission.repository.js";

export const challengeMission = async (
  missionId: number,
  data: ChallengeMissionRequest
) => {
  const mission = await getMissionById(missionId);

  if (mission.length === 0) {
    throw new Error("존재하지 않는 미션입니다.");
  }

  const userMission = await getUserMission(data.userId, missionId);

  if (userMission.length > 0) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  await addUserMission(data.userId, missionId);
};