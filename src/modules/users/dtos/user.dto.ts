// 1. 회원가입 요청 데이터의 설계도를 만듭니다.
export interface UserSignUpRequest {
  email: string;
  name: string;
  gender: string;
  birth: string;
  address?: string;       // ?가 붙으면 '없을 수도 있음(선택)'이라는 뜻이에요!
  detailAddress?: string;
  phoneNumber: string;
  preferences: number[];
}

// 2. 요청받은 데이터를 우리 시스템에 맞는 데이터로 변환해주는 함수입니다. 
export const bodyToUser = (body: UserSignUpRequest) => {
  const birth = new Date(body.birth); //날짜 변환

  return {
    email: body.email, //필수 
    name: body.name, // 필수
    gender: body.gender, // 필수
    birth, // 필수
    address: body.address || "", //선택 
    detailAddress: body.detailAddress || "", //선택 
    phoneNumber: body.phoneNumber,//필수
    preferences: body.preferences,// 필수 
  };
};

// 3. 클라이언트에게 응답할 데이터의 설계도를 만듭니다. (응답용 DTO 인터페이스)
export interface UserResponseDTO {
  email: string;
  name: string;
  preferCategory: string[]; // 응답할 때는 카테고리 이름(문자열) 배열로 반환한다고 가정
}


// 4. Service에서 받아온 유저 정보 + 선호 카테고리를 클라이언트에게 보여줄 형식으로 변환하는 함수입니다!
export const responseFromUser= (data: {user:any, preferences: any[]}): UserResponseDTO => {
    const perferCategory= data.preferences.map((p)=>p.foodCategory.name);

    return {
        email: data.user.email,
        name: data.user.name,
        preferCategory: perferCategory,
    }

}

// 내가 작성한 리뷰 목록

export interface UserReviewItem {
  id: number;
  storeName: string;
  userName: string;
  content: string;
}

export interface UserReviewResponse {
  data: UserReviewItem[];
  pagination: {
    cursor: number | null;
  };
}

// 여러 개의 유저 리뷰 배열을 받아 페이지네이션 구조로 변환하는 함수
export const responseFromUserReviews = (reviews: any[]): UserReviewResponse => {
  const data = reviews.map((review) => ({
    id: review.id,
    storeName: review.store.name,
    userName: review.user.name,
    content: review.content,
  }));

  const lastReview = reviews[reviews.length - 1];

  return {
    data,
    pagination: {
      cursor: lastReview ? lastReview.id : null,
    },
  };
};

// 내가 진행 중인 미션 목록 구현
// 진행 중인 미션 하나의 형태
export interface UserOngoingMissionResponseDTO {
    userMissionId: number;
    missionId: number;
    storeName: string;      // "가게이름a 에서" 화면에 띄워주기 위해 필요!
    reward: number;
    missionSpec: string;    // "12,000원 이상의 식사를 하세요!"
    status: string;         // "진행중"
}

// 최종 목록 포장 박스
export interface UserOngoingMissionListResponseDTO {
    missions: UserOngoingMissionResponseDTO[];
    nextCursor: number | null;
    hasMore: boolean;
}

// DB 데이터를 규격에 맞게 예쁘게 맵핑하는 함수
export const responseFromOngoingMissions = (userMissions: any[], size: number): UserOngoingMissionListResponseDTO => {
    const hasMore = userMissions.length > size;
    const targetMissions = hasMore ? userMissions.slice(0, size) : userMissions;
    const nextCursor = hasMore && targetMissions.length > 0 ? targetMissions[targetMissions.length - 1].id : null;

    return {
        missions: targetMissions.map((um) => ({
            userMissionId: um.id,
            missionId: um.mission_id,
            storeName: um.store_name,       // JOIN 쿼리로 가져올 예정
            reward: um.reward,
            missionSpec: um.mission_spec,
            status: um.status
        })),
        nextCursor,
        hasMore,
    };
};

export interface MissionCompleteResponseDTO {
    userMissionId: number;
    status: string; // "진행완료"로 바뀐 상태 반환
}

export const responseFromCompleteMission = (userMissionId: number): MissionCompleteResponseDTO => {
    return {
        userMissionId,
        status: "진행완료"
    };
};