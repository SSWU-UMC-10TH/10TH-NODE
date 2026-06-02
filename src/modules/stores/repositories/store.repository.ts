import { pool } from "../../../db.config.js";

// [1-1] 가게 추가
export const addStore = async (data: any) => {
  const conn = await pool.getConnection();
  try {
    console.log("레포지토리로 넘어온 데이터:", data);
    const query = "INSERT INTO store (name, address, category_id, region_id) VALUES (?, ?, ?, ?)";
    const [result] = await conn.query(query, [data.name, data.address, data.categoryId, data.regionId]);
    return result;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

// [1-2] 리뷰 추가
export const addReview = async (data: any) => {
  const conn = await pool.getConnection();
  try {
    const query = "INSERT INTO review (user_id, store_id, rating, content) VALUES (?, ?, ?, ?)";
    const [result] = await conn.query(query, [data.userId, data.storeId, data.rating, data.content]);
    return result;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

// [1-3] 미션 추가
export const addMission = async (data: any) => {
  const conn = await pool.getConnection();
  try {
    const query = "INSERT INTO mission (store_id, reward, deadline, mission_spec) VALUES (?, ?, ?, ?)";
    const [result] = await conn.query(query, [data.storeId, data.reward, data.deadline, data.missionSpec]);
    return result;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

// [1-4] 미션 도전
export const addUserMission = async (data: any) => {
  const conn = await pool.getConnection();
  try {
    const query = "INSERT INTO user_mission (user_id, mission_id, status) VALUES (?, ?, ?)";
    const [result] = await conn.query(query, [data.userId, data.missionId, data.status]);
    return result;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};