export interface AddReviewRequest {
  userId: number;
  rating: number;
  content: string;
}

export interface AddMissionRequest {
  title: string;
  description: string;
  rewardPoint: number;
  deadline: string;
}

export const responseFromReviews = (reviews: any[]) => {
  const last = reviews[reviews.length - 1];

  return {
    data: reviews,
    pagination: {
      cursor: last ? last.id : null,
    },
  };
};