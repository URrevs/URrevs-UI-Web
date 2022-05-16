import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CustomAppBar } from "../../Components/MainLayout/AppBar/CustomAppBar";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import ROUTES_NAMES from "../../RoutesNames";
import {
  useGetAllReviewsQuery,
  useGetPhoneReviewsQuery,
} from "../../services/phone_reviews";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { reviewsActions } from "../../store/reviewsSlice";
import VirtualReviewList from "../VirtualListWindowScroll";

export function ProductReviews() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("clear reviews");

    dispatch(reviewsActions.clearReviews());
  }, []);

  const reviewsList = useAppSelector((state) => state.reviews.newReviews);
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const phoneId = searchParams.get("pid");

  const { data, isLoading, isFetching, error } = useGetPhoneReviewsQuery({
    round: page,
    pid: phoneId,
  });

  const stateLike = (id) => {
    console.log(id);
    dispatch(reviewsActions.setIsLiked({ id: id, isLiked: true }));
  };

  const stateUnLike = (id) =>
    dispatch(reviewsActions.setIsLiked({ id: id, isLiked: false }));

  const addToReviewsList = () =>
    dispatch(
      reviewsActions.addToLoaddedReviews({
        newReviews: data,
      })
    );

  const increasePage = () => {
    console.log(page);
    return setPage(page + 1);
  };

  const reviewCard = (index, clearCache) => {
    return (
      <ReviewCard
        index={index}
        fullScreen={false}
        isExpanded={false}
        clearIndexCache={clearCache}
        reviewDetails={reviewsList[index]}
        isPhoneReview={true}
        targetProfilePath={`/${ROUTES_NAMES.PHONE_PROFILE}?pid=${reviewsList[index].targetId}`}
        userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${reviewsList[index].userId}`}
        stateLikeFn={stateLike.bind(null, reviewsList[index]._id)}
        stateUnlikeFn={stateUnLike.bind(null, reviewsList[index]._id)}
        fullScreenRoute={`/${ROUTES_NAMES.EXACT_PHONE_REVIEW}?id=${reviewsList[index]._id}`}
      />
    );
  };

  return (
    <VirtualReviewList
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
  );
}
