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
// 1) 목록에 들어갈 리뷰 한 개 한 개의 데이터 구조
export interface ReviewItem {
    id: number;
    userId: number;
    userName: string; // 리뷰 작성자 이름
    rating: number;
    content: string;
    createdAt: Date;
}

// 2) 클라이언트에게 최종적으로 전달할 목록 응답 데이터 구조 설계도
export interface ReviewListResponse {
    data: ReviewItem[];
    pagination: {
        cursor: number | null;
    };
}

// 3) 여러 개의 리뷰 배열을 받아 페이지네이션 구조로 변환하는 함수
export const responseFromReviews = (reviews: ReviewItem[]): ReviewListResponse => {
    const lastReview = reviews[reviews.length - 1];

    return {
        data: reviews,
        pagination: {
            cursor: lastReview ? lastReview.id : null,
        },
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

// 특정 가게의 미션 목록 조회를 위한 응답 DTO 규격
export interface StoreMissionResponseDTO {
    missionId: number;
    storeId: number;
    reward: number;
    deadline: string;
    missionSpec: string;
}

// 클라이언트에게 최종적으로 전달할 목록 형태의 포장 박스
export interface StoreMissionListResponseDTO {
    missions: StoreMissionResponseDTO[]; // 미션 배열
    nextCursor: number | null;           // 다음 조회를 위한 커서 ID
    hasMore: boolean;                    // 다음 페이지 존재 여부
}

// DB에서 긁어온 여러 개의 미션 데이터를 위 형식으로 예쁘게 가공하는 함수
export const responseFromStoreMissions = (missions: any[], size: number): StoreMissionListResponseDTO => {
    // 요청한 size보다 데이터가 더 많이 왔다면, 다음 페이지가 있다는 뜻입니다 (아래 Service에서 1개 더 가져올 예정)
    const hasMore = missions.length > size;
    
    // 다음 페이지가 있다면 마지막 1개는 잘라내고, 그 잘라낸 데이터의 ID를 다음 커서로 지정합니다.
    const targetMissions = hasMore ? missions.slice(0, size) : missions;
    const nextCursor = hasMore && targetMissions.length > 0 ? targetMissions[targetMissions.length - 1].id : null;

    return {
        missions: targetMissions.map((m) => ({
            missionId: m.id,
            storeId: m.store_id,
            reward: m.reward,
            deadline: m.deadline.toISOString().split('T')[0], // 날짜를 YYYY-MM-DD 형식 문자열로 예쁘게 가공
            missionSpec: m.mission_spec,
        })),
        nextCursor,
        hasMore,
    };
};