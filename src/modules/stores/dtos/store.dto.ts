// 1. 클라이언트가 보내는 가게 추가 요청 데이터 (Request)
export interface StoreCreateRequest {
  name: string;          // 가게 이름
  address: string;       // 가게 주소
  categoryId: number;    // 식당 카테고리 (예: 1: 한식, 2: 중식 등)
}

export const bodyToStore = (body: StoreCreateRequest) => {
  return {
    name: body.name,
    address: body.address,
    categoryId: body.categoryId,
  };
};

// 2. 서버가 클라이언트에게 돌려줄 응답 데이터 (Response)
export interface StoreResponseDTO {
  storeId: number;       // 새로 생성된 가게의 ID
  name: string;          // 가게 이름
  regionId: number;      // 소속된 지역 ID
}

// 3. Service 로직 처리가 끝난 후 응답 형식을 만들어주는 함수
export const responseFromStore = (store: any, regionId: number): StoreResponseDTO => {
  return {
    storeId: store.insertId, // DB 저장 후 반환된 ID 값 (DB 설정에 따라 이름이 다를 수 있음)
    name: store.name,
    regionId: regionId,
  };
};

// 1-2. 가게에 리뷰 추가하기 DTO
// (1) 요청 (Request)
export interface ReviewCreateRequest {
  userId: number;
  rating: number;
  content: string;
}

export const bodyToReview = (body: ReviewCreateRequest, storeId: number) => {
  return {
    userId: body.userId,
    storeId,             // Path에서 뽑아온 가게 ID
    rating: body.rating,
    content: body.content,
  };
};

// (2) 응답 (Response)
export interface ReviewResponseDTO {
  reviewId: number;
  storeId: number;
  userId: number;
  rating: number;
  content: string;
}

export const responseFromReview = (review: any, storeId: number): ReviewResponseDTO => {
  return {
    reviewId: review.insertId, // DB 삽입 후 받아온 ID
    storeId: storeId,
    userId: review.userId,
    rating: review.rating,
    content: review.content,
  };
};

// 1-3. 가게에 미션 추가하기 DTO
// (1) 요청 (Request)
export interface MissionCreateRequest {
  reward: number;
  deadline: string;      
  missionSpec: string;
}

export const bodyToMission = (body: MissionCreateRequest, storeId: number) => {
  return {
    storeId,
    reward: body.reward,
    deadline: new Date(body.deadline), // 문자열을 날짜 객체로 변환
    missionSpec: body.missionSpec,
  };
};

// (2) 응답 (Response)
export interface MissionResponseDTO {
  missionId: number;
  storeId: number;
  reward: number;
  deadline: string; // 클라이언트에게는 다시 문자열로 주는 것이 보통입니다
  missionSpec: string;
}

export const responseFromMission = (mission: any, storeId: number): MissionResponseDTO => {
  return {
    missionId: mission.insertId,
    storeId: storeId,
    reward: mission.reward,
    deadline: mission.deadline,
    missionSpec: mission.missionSpec,
  };
};

// 1-4. 미션 도전하기 DTO
// (1) 요청 (Request)
// Body로 받을 데이터가 없으므로 interface 생략! Path 파라미터만 묶어줍니다.
export const paramsToUserMission = (userId: number, missionId: number) => {
  return {
    userId,
    missionId,
    status: "진행 중", // 기본 상태
  };
};

// (2) 응답 (Response)
export interface UserMissionResponseDTO {
  userMissionId: number;
  userId: number;
  missionId: number;
  status: string;
}

export const responseFromUserMission = (userMission: any): UserMissionResponseDTO => {
  return {
    userMissionId: userMission.insertId,
    userId: userMission.userId,
    missionId: userMission.missionId,
    status: userMission.status,
  };
};