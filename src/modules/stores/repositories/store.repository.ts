import { prisma } from "../../../db.config.js";
import { MISSION_STATUS } from "../../missions/enums/mission-status.enum.js";

// 피드백 반영 수정: mysql2 pool/raw SQL 대신 Prisma ORM을 사용합니다.
export const getStoreById = async (storeId: number) => {
  return await prisma.store.findUnique({
    where: { id: storeId },
  });
};

// 피드백 반영 수정: INSERT raw SQL 대신 Prisma create를 사용하되, 생성 동작은 기존과 동일하게 유지합니다.
export const addReview = async (
  userId: number,
  storeId: number,
  rating: number,
  content: string
) => {
  return await prisma.review.create({
    data: {
      userId,
      storeId,
      rating,
      content,
    },
  });
};

// 피드백 반영 수정: INSERT raw SQL 대신 Prisma create를 사용하되, deadline은 Date 타입으로 변환해 저장합니다.
export const addMission = async (
  storeId: number,
  title: string,
  description: string,
  rewardPoint: number,
  deadline: string
) => {
  return await prisma.mission.create({
    data: {
      storeId,
      title,
      description,
      rewardPoint,
      deadline: new Date(deadline),
    },
  });
};

export const getMyReviews = async (userId: number, cursor?: number) => {
  return await prisma.review.findMany({
    where: {
      userId,
      ...(cursor && { id: { lt: cursor } }),
    },
    orderBy: {
      id: "desc",
    },
    take: 10,
    include: {
      store: true,
    },
  });
};

export const getMissionsByStoreId = async (storeId: number) => {
  return await prisma.mission.findMany({
    where: { storeId },
    orderBy: { id: "asc" },
  });
};

export const getUserMissionById = async (userMissionId: number) => {
  return await prisma.userMission.findUnique({
    where: { id: userMissionId },
  });
};

// 피드백 반영 수정: 이미 완료된 미션 재요청이 동시에 들어와도 status 조건으로 한 번 더 보호합니다.
export const completeMissionIfNotCompleted = async (userMissionId: number) => {
  return await prisma.userMission.updateMany({
    where: {
      id: userMissionId,
      status: {
        not: MISSION_STATUS.COMPLETE,
      },
    },
    data: {
      status: MISSION_STATUS.COMPLETE,
      completedAt: new Date(),
    },
  });
};
