import { prisma } from "../../../db.config.js";
import { MISSION_STATUS } from "../enums/mission-status.enum.js";

// 피드백 반영 수정: mysql2 pool/raw SQL 대신 Prisma ORM을 사용합니다.
export const getMissionById = async (missionId: number) => {
  return await prisma.mission.findUnique({
    where: { id: missionId },
  });
};

// 피드백 반영 수정: mysql2 pool/raw SQL 대신 Prisma ORM을 사용합니다.
export const getUserMission = async (userId: number, missionId: number) => {
  return await prisma.userMission.findFirst({
    where: {
      userId,
      missionId,
    },
  });
};

// 피드백 반영 수정: status는 공통 상수 MISSION_STATUS를 사용합니다.
export const addUserMission = async (userId: number, missionId: number) => {
  return await prisma.userMission.create({
    data: {
      userId,
      missionId,
      status: MISSION_STATUS.IN_PROGRESS,
    },
  });
};
