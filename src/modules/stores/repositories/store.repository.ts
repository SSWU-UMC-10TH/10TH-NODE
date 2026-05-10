import { prisma } from "../../../db.config.js";
import { RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

export const getStoreById = async (storeId: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM store WHERE id = ?",
    [storeId]
  );

  return rows;
};

export const addReview = async (
  userId: number,
  storeId: number,
  rating: number,
  content: string
) => {
  const query = `
    INSERT INTO review (user_id, store_id, rating, content)
    VALUES (?, ?, ?, ?)
  `;

  await pool.query(query, [userId, storeId, rating, content]);
};

export const addMission = async (
  storeId: number,
  title: string,
  description: string,
  rewardPoint: number,
  deadline: string
) => {
  const query = `
    INSERT INTO mission (store_id, title, description, reward_point, deadline)
    VALUES (?, ?, ?, ?, ?)
  `;

  await pool.query(query, [storeId, title, description, rewardPoint, deadline]);
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

export const completeMission = async (userMissionId: number) => {
  return await prisma.userMission.update({
    where: { id: userMissionId },
    data: {
      status: "COMPLETE",
    },
  });
};