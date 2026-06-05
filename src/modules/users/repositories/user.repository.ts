import { ResultSetHeader, RowDataPacket } from "mysql2";
import { prisma } from "../../../db.config.js";

// User 데이터 삽입
export const addUser = async (data: any) => {
  // 1. 이미 존재하는 이메일인지 확인
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  
  if (user) {
    return null;
  }

  // 2. 새로운 유저 생성
  const created = await prisma.user.create({ 
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
    } 
  });

  return created.id;
};

export const getUser = async (userId: number) => {
  return await prisma.user.findFirstOrThrow({ where: { id: userId } });
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId: number, foodCategoryId: number) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환 (JOIN)
export const getUserPreferencesByUserId = async (userId: number) => {
  return await prisma.userFavorCategory.findMany({
    where: { userId: userId },
    include: {
      foodCategory: true, // 💡 핵심: JOIN 대신 include를 써서 연관 데이터를 가져옵니다!
    },
    orderBy: { foodCategoryId: "asc" },
  });
};

// 내가 작성한 리뷰 목록

export const getUserReviews = async (userId: number, cursor: number) => {
  return await prisma.userStoreReview.findMany({
    select: {
      id: true,
      content: true,
      store: {
        select: {
          name: true, // 리뷰가 어느 가게에 달렸는지 '가게 이름'을 가져오기 위한 JOIN(include) 효과
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: {
      userId: userId, // 핵심: 특정 유저의 ID로 필터링
      id: {
        gt: cursor,   // 커서 기반 페이지네이션
      },
    },
    orderBy: {
      id: "asc",
    },
    take: 5, // 한 번에 5개씩 가져옵니다.
  });
};

export const getOngoingMissionsByUserId = async (userId: number, cursor: number | null, limit: number) => {
    return await prisma.userMission.findMany({
    where: {
      user_id: userId,
      status: "진행 중",
      ...(cursor ? { id: { lt: cursor } } : {}),
    },
    orderBy: {
      id: "desc",
    },
    take: limit,
    include: {
      mission: {
        select: {
          id: true,
          reward: true,
          mission_spec: true,
          store: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
};

export const updateUserMissionStatus = async (userMissionId: number, status: string) => {
    await prisma.userMission.update({
    where: {
      id: userMissionId,
    },
    data: {
      status,
    },
  });

  return true;
};