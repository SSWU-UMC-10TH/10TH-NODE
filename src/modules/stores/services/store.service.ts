// store.service.ts
import { addStore, addReview, addMission, addUserMission, getAllStoreReviews } from "../repositories/store.repository.js";
import { responseFromStore, responseFromReview, responseFromMission, responseFromUserMission, ReviewListResponse, responseFromReviews, ReviewItem } from "../dtos/store.dto.js";

export const createStore = async (data: any, regionId: number) => {
  const storeData = { ...data, regionId };
  const store = await addStore(storeData);
  return responseFromStore(store, regionId);
};

export const createReview = async (data: any, storeId: number) => {
  const review = await addReview(data);
  return responseFromReview(review, storeId);
};

export const createMission = async (data: any, storeId: number) => {
  const mission = await addMission(data);
  return responseFromMission(mission, storeId);
};

export const createUserMission = async (data: any) => {
  const userMission = await addUserMission(data);
  return responseFromUserMission(userMission);
};

export const listStoreReviews = async (storeId: number, cursor: number): Promise<ReviewListResponse> => {
    // 1. 레포지토리에서 DB 데이터(날것)를 가져옵니다.
    const rawReviews = await getAllStoreReviews(storeId, cursor); 

    // 2. DTO 인터페이스(ReviewItem) 형식에 맞게 데이터를 한 땀 한 땀 매핑해 줍니다.
    const formattedReviews: ReviewItem[] = rawReviews.map((review: any) => ({
        id: review.id,
        userId: review.user.id,
        userName: review.user.name, // 작성자 이름 매핑
        rating: review.rating || 0,  // 스키마에 rating이 있다면 review.rating (없으면 기본값 0)
        content: review.content,
        createdAt: review.createdAt || new Date(),
    }));

    // 3. 예쁘게 포맷팅된 배열을 DTO 함수에 집어넣어 리턴합니다!
    return responseFromReviews(formattedReviews);
};

// 레포지토리에서 쿼리 함수를 가져옵니다 (아래에서 만들 예정)
import { getMissionsByStoreId } from "../repositories/store.repository.js";
import { responseFromStoreMissions } from "../dtos/store.dto.js";

export const getStoreMissions = async (storeId: number, cursor: number | null, size: number) => {
    // 💡 꿀팁: 커서 기반 페이지네이션에서는 "다음 페이지가 진짜 있는지" 판별하기 위해 
    // 요청한 size보다 딱 1개 더 많이(size + 1) DB에서 긁어옵니다.
    const missions = await getMissionsByStoreId(storeId, cursor, size + 1);
    
    // 가져온 데이터를 규격에 맞게 변환해서 반환
    return responseFromStoreMissions(missions, size);
};