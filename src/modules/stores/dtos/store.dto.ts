export interface AddReviewRequest {
  /** 리뷰 평점 (0 이상 5 이하) */
  rating: number;
  /** 리뷰 내용 */
  content: string;
}

export interface AddMissionRequest {
  /** 미션 제목 */
  title: string;
  /** 미션 설명 */
  description: string;
  /** 미션 보상 포인트 */
  rewardPoint: number;
  /** 미션 마감일 */
  deadline: string;
}

export interface StoreSummary {
  /** 가게 ID */
  id: number;
  /** 가게 이름 */
  name: string;
}

export interface ReviewResponse {
  /** 리뷰 ID */
  id: number;
  /** 리뷰 작성 회원 ID */
  userId: number;
  /** 리뷰 대상 가게 ID */
  storeId: number;
  /** 리뷰 평점 */
  rating: number;
  /** 리뷰 내용 */
  content: string;
  /** 리뷰 작성 시각 */
  createdAt: Date;
  /** 리뷰 수정 시각 */
  updatedAt: Date;
  /** 리뷰 대상 가게 */
  store: StoreSummary;
}

export interface ReviewListResponse {
  /** 리뷰 목록 */
  data: ReviewResponse[];
  /** 다음 조회에 사용할 커서 */
  pagination: {
    cursor: number | null;
  };
}

export interface StoreMissionResponse {
  /** 미션 ID */
  id: number;
  /** 가게 ID */
  storeId: number;
  /** 미션 제목 */
  title: string;
  /** 미션 설명 */
  description: string;
  /** 미션 보상 포인트 */
  rewardPoint: number;
  /** 미션 마감일 */
  deadline: Date;
  /** 생성 시각 */
  createdAt: Date;
  /** 수정 시각 */
  updatedAt: Date;
}

export interface UserMissionResponse {
  /** 회원 미션 ID */
  id: number;
  /** 회원 ID */
  userId: number;
  /** 미션 ID */
  missionId: number;
  /** 회원 미션 상태 */
  status: string;
  /** 미션 완료 시각 */
  completedAt: Date | null;
  /** 생성 시각 */
  createdAt: Date;
  /** 수정 시각 */
  updatedAt: Date;
}

export const responseFromReviews = (reviews: ReviewResponse[]): ReviewListResponse => {
  const last = reviews[reviews.length - 1];

  return {
    data: reviews,
    pagination: {
      cursor: last ? last.id : null,
    },
  };
};
