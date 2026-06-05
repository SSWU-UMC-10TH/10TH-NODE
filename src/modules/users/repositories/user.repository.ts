import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";
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
    const conn = await pool.getConnection();
    try {
        let query = "";
        let params = [];

        // 유저가 도전 중(status = '진행 중')인 미션 정보를 가게 이름과 함께 JOIN
        const baseQuery = `
            SELECT um.id, um.mission_id, um.status, m.reward, m.mission_spec, s.name as store_name
            FROM user_mission um
            JOIN mission m ON um.mission_id = m.id
            JOIN store s ON m.store_id = s.id
            WHERE um.user_id = ? AND um.status = '진행 중'
        `;

        if (cursor) {
            query = `${baseQuery} AND um.id < ? ORDER BY um.id DESC LIMIT ?`;
            params = [userId, cursor, limit];
        } else {
            query = `${baseQuery} ORDER BY um.id DESC LIMIT ?`;
            params = [userId, limit];
        }

        const [rows] = await conn.query(query, params);
        return rows as any[];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
};

export const updateUserMissionStatus = async (userMissionId: number, status: string) => {
    const conn = await pool.getConnection();
    try {
        const query = `UPDATE user_mission SET status = ? WHERE id = ?`;
        await conn.query(query, [status, userMissionId]);
        return true;
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
};