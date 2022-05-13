import React, { useEffect, useState } from "react";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { useGetAllReviewsQuery } from "../services/reviews";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { reviewsActions } from "../store/reviewsSlice";
import CommentsList from "./CommentsList";
import { useSearchParams } from "react-router-dom";
import ReviewCard from "../Components/ReviewCard/ReviewCard";
import ROUTES_NAMES from "../RoutesNames";
import { Box } from "@mui/material";

export default function InteractionWithReview() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("clear comments");

    dispatch(reviewsActions.clearReviews());
  }, []);

  const reviewsList = useAppSelector((state) => state.reviews.newReviews);

  const [searchParams, setSearchParams] = useSearchParams();
  const reviewId = searchParams.get("id");

  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useGetAllReviewsQuery(page);

  // get this review from store
  const currentReview = useAppSelector(
    (state) => state.reviews.newReviews
  ).find((element) => {
    return element._id === reviewId;
  });

  const stateLike = (id) =>
    dispatch(reviewsActions.setIsLiked({ id: id, isLiked: true }));

  const stateUnLike = (id) =>
    dispatch(reviewsActions.setIsLiked({ id: id, isLiked: false }));

  const addToReviewsList = () =>
    dispatch(
      reviewsActions.addToLoaddedReviews({
        newReviews: data,
      })
    );

  const increasePage = () => setPage(page + 1);

  const reviewCard = () => {
    return (
      <div>
        <ReviewCard
          isPhoneReview={true}
          fullScreen={true}
          isExpanded={true}
          reviewDetails={currentReview}
          clearIndexCache={() => {}}
          index={0}
          targetProfilePath={`/${ROUTES_NAMES.PHONE_PROFILE}?pid=${currentReview.targetId}`}
          userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${currentReview.userId}`}
          stateLikeFn={stateLike.bind(null, currentReview._id)}
          stateUnlikeFn={stateUnLike.bind(null, currentReview._id)}
        />
      </div>
    );
  };

  return (
    <Box>
      <CustomAppBar showLogo showSearch showProfile />
      <CommentsList
        reviewCard={reviewCard}
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
      <div style={{ display: "fixed", zIndex: 1000, bottom: 0 }}>
        <input />
      </div>
    </Box>
  );
}
