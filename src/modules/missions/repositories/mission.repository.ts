import { RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

export const getMissionById = async (missionId: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM mission WHERE id = ?",
    [missionId]
  );

  return rows;
};

export const getUserMission = async (userId: number, missionId: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM user_mission WHERE user_id = ? AND mission_id = ?",
    [userId, missionId]
  );

  return rows;
};

export const addUserMission = async (userId: number, missionId: number) => {
  await pool.query(
    "INSERT INTO user_mission (user_id, mission_id, status) VALUES (?, ?, ?)",
    [userId, missionId, "진행중"]
  );
};