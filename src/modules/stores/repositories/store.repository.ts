import { prisma } from "../../../db.config.js";

// [1-1] 가게 추가 (Prisma 버전)
export const addStore = async (data: any) => {
  console.log("레포지토리로 넘어온 데이터:", data);
  
  // 💡 prisma.store.create를 사용하여 데이터를 삽입합니다.
  return await prisma.store.create({
    data: {
      name: data.name,
      // 만약 스키마에 address, categoryId, regionId 컬럼이 있다면 아래 주석을 풀고 맞춰서 넣어주세요!
      // address: data.address,
    },
  });
};

// [1-2] 리뷰 추가 (Prisma 버전)
export const addReview = async (data: any) => {
  // 💡 아까 스키마에 추가했던 userStoreReview 모델을 활용합니다!
  return await prisma.userStoreReview.create({
    data: {
      userId: data.userId,
      storeId: data.storeId,
      content: data.content,
      // 만약 스키마에 rating 컬럼이 있다면 추가해 줍니다.
    },
  });
};

// [1-3] 미션 추가 (Prisma 버전)
export const addMission = async (data: any) => {
  // 💡 만약 미션 생성을 사용하려면 schema.prisma에 model Mission이 정의되어 있어야 합니다.
  // 현재는 예시 구문으로 작성해 둡니다.
  return await prisma.mission.create({
    data: {
      storeId: data.storeId,
      reward: data.reward,
      deadline: data.deadline,
      missionSpec: data.missionSpec,
    },
  });
};

// [1-4] 미션 도전 (Prisma 버전)
export const addUserMission = async (data: any) => {
  // 💡 유저 미션 도전 테이블도 마찬가지로 모델 이름에 맞게 매핑합니다.
  return await prisma.userMission.create({
    data: {
      userId: data.userId,
      missionId: data.missionId,
      status: data.status,
    },
  });
};

// [기존에 구현 완료한 리뷰 전체 조회 함수]
export const getAllStoreReviews = async (storeId: number, cursor: number) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: {
      id: true,
      content: true,
      store: true,
      user: true,
    },
    where: {
      storeId,
      id: {
        gt: cursor,
      },
    },
    orderBy: {
      id: "asc",
    },
    take: 5,
  });

  return reviews;
};

// 특정 가게의 미션 목록

export const getMissionsByStoreId = async (
  storeId: number,
  cursor: number | null,
  limit: number
) => {
  const missions = await prisma.mission.findMany({
    where: {
      storeId,
      ...(cursor ? { id: { lt: cursor } } : {}),
    },
    select: {
      id: true,
      storeId: true,
      reward: true,
      deadline: true,
      missionSpec: true,
    },
    orderBy: {
      id: "desc",
    },
    take: limit,
  });

  return missions;
};