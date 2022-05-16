import { useGetAllReviewsQuery } from "../services/phone_reviews";

export const useGetReviews = (page) => {
  return useGetAllReviewsQuery(page);
};
