import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { FilterTabbar } from "../Components/Tabbar/FilterTabbar";
import { useGetOtherUserPhoneReviewsQuery } from "../services/phone_reviews";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { reviewsActions } from "../store/reviewsSlice";
import VirtualReviewList from "./VirtualListWindowScroll";
import ReviewCard from "../Components/ReviewCard/ReviewCard";
import ROUTES_NAMES from "../RoutesNames";

export default function PostedReviews() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("clear reviews");

    dispatch(reviewsActions.clearReviews());
  }, []);

  const reviewsList = useAppSelector((state) => state.reviews.newReviews);
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const { data, isLoading, isFetching, error } =
    useGetOtherUserPhoneReviewsQuery({ round: page, uid: userId });

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
    <CustomAppBar
      showLabel
      label="مراجعاتي"
      showBackBtn
      tabBar={<FilterTabbar />}
    >
      <VirtualReviewList
        reviewCard={reviewCard}
        reviewsList={reviewsList}
        page={page}
        data={data}
        error={error}
        isLoading={isLoading}
        isFetching={isFetching}
        addToReviewsList={addToReviewsList}
        increasePage={increasePage}
      />
    </CustomAppBar>
  );
}
