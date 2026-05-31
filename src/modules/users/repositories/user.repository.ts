import { prisma } from "../../../db.config.js";

export const addUser = async (data: any): Promise<number> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    const user = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
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

export const getUser = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const getOrCreateGoogleUser = async (data: {
  email: string;
  name: string;
}) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    return existingUser;
  }

  return await prisma.user.create({
    data: {
      email: data.email,
      password: "",
      name: data.name,
      gender: "unknown",
      birth: new Date("1970-01-01"),
      address: "",
      detailAddress: null,
      phoneNumber: "",
    },
  });
};

export const updateUser = async (userId: number, data: any) => {
  return await prisma.user.update({
    where: { id: userId },
    data,
  });
};

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

export const clearPreferences = async (userId: number): Promise<void> => {
  await prisma.userFavorCategory.deleteMany({
    where: { userId },
  });
};

export const getUserPreferencesByUserId = async (userId: number) => {
  return await prisma.userFavorCategory.findMany({
    where: { userId },
    orderBy: { foodCategoryId: "asc" },
    include: {
      foodCategory: true,
    },
  });
};
