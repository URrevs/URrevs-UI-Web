import { Box } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ReviewCard from "../Components/ReviewCard/ReviewCard";
import ROUTES_NAMES from "../RoutesNames";
import { useGetReviewQuery } from "../services/reviews";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { reviewsActions } from "../store/reviewsSlice";

export default function InteractionWithReview() {
  const dispatch = useAppDispatch();
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const language = useAppSelector((state) => state.language.language);

  const [searchParams, setSearchParams] = useSearchParams();
  const reviewId = searchParams.get("id");

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

  const { data, error, isLoading } = useGetReviewQuery(reviewId);

  const currentUser = useAppSelector((state) => state.auth);

  return (
    <CustomAppBar showBackBtn={true} showSearch showProfile>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Box style={{ margin: "0 0" }}>
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
        </Box>
      )}
    </CustomAppBar>
  );
}
