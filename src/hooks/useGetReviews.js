import { useGetAllReviewsQuery } from "../services/reviews";

export const useGetReviews = (page) => {
  return useGetAllReviewsQuery(page);
};
