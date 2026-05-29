import { pool } from "../../../db.config.js"; // DB 연결 풀

export const addStore = async (data: any) => {
  const conn = await pool.getConnection();
  try {
    const query = "INSERT INTO store (name, address, category_id, region_id) VALUES (?, ?, ?, ?)";
    const [result] = await conn.query(query, [data.name, data.address, data.categoryId, data.regionId]);
    return result;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};