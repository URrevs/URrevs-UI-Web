import React from "react";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { useGetAllReviewsQuery } from "../services/reviews";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { reviewsActions } from "../store/reviewsSlice";
import Virtual from "./VirtualListWindowScroll";

function Reviews() {
  const dispatch = useAppDispatch();
  const reviewsList = useAppSelector((state) => state.reviews.newReviews);
  const page = useAppSelector((state) => state.reviews.page);
  const { data, isLoading, isFetching, error } = useGetAllReviewsQuery(page);

  const stateLike = (index) =>
    dispatch(reviewsActions.setIsLiked({ index: index, isLiked: true }));

  const stateUnLike = (index) =>
    dispatch(reviewsActions.setIsLiked({ index: index, isLiked: false }));

  const addToReviewsList = () =>
    dispatch(
      reviewsActions.addToLoaddedReviews({
        newReviews: data,
      })
    );

  const increasePage = () => dispatch(reviewsActions.increasePage());

  return (
    <CustomAppBar showLogo showSearch showProfile>
      <Virtual
        reviewsList={reviewsList}
        page={page}
        data={data}
        error={error}
        isLoading={isLoading}
        isFetching={isFetching}
        stateLike={stateLike}
        stateUnLike={stateUnLike}
        addToReviewsList={addToReviewsList}
        increasePage={increasePage}
      />
    </CustomAppBar>
  );
}

export default Reviews;
