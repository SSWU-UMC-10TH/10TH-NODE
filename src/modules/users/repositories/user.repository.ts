import { prisma } from "../../../db.config.js";

// 피드백 반영 수정: 회원 생성도 mysql2 pool/raw SQL 대신 Prisma ORM을 사용합니다.
export const addUser = async (data: any): Promise<number | null> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    return null;
  }

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
    },
  });

  return user.id;
};

// 피드백 반영 수정: 회원 조회도 Prisma ORM을 사용합니다.
export const getUser = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

// 피드백 반영 수정: 선호 카테고리 매핑도 Prisma ORM을 사용합니다.
export const setPreference = async (
  userId: number,
  foodCategoryId: number
): Promise<void> => {
  await prisma.userFavorCategory.create({
    data: {
      userId,
      foodCategoryId,
    },
  });
};

// 피드백 반영 수정: 선호 카테고리 조회도 Prisma include로 처리합니다.
export const getUserPreferencesByUserId = async (userId: number) => {
  return await prisma.userFavorCategory.findMany({
    where: { userId },
    orderBy: { foodCategoryId: "asc" },
    include: {
      foodCategory: true,
    },
  });
};
