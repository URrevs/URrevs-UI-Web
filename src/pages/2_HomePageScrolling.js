import React, { useEffect, useState } from "react";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import PhoneReview from "../Components/ReviewCard/PhoneReview";
import ROUTES_NAMES from "../RoutesNames";
import { useGetRecommendedQuery } from "../services/homePage";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { homePageActions } from "../store/homePageSlice";
import VirtualReviewList from "./VirtualListWindowScroll";

function Reviews() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("clear reviews");

    dispatch(homePageActions.clearReviews());
  }, []);

  const reviewsList = useAppSelector((state) => state.homePage.newReviews);
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useGetRecommendedQuery();

  const stateLike = (id) =>
    dispatch(homePageActions.setIsLiked({ id: id, isLiked: true }));

  const stateUnLike = (id) =>
    dispatch(homePageActions.setIsLiked({ id: id, isLiked: false }));

  const addToReviewsList = () =>
    dispatch(
      homePageActions.addToLoaddedReviews({
        newReviews: data,
      })
    );

  const increasePage = () => setPage(page + 1);

  const deleteReviewFromStore = (id) => {
    dispatch(homePageActions.clearReviews());
    const n = reviewsList.filter((review) => review._id !== id);
    console.log(n);

    dispatch(
      homePageActions.addToLoaddedReviews({
        newReviews: n,
      })
    );
  };

  const reviewCard = (index, clearCache) => {
    return (
      <PhoneReview
        key={reviewsList[index]._id}
        index={index}
        fullScreen={false}
        isExpanded={false}
        clearIndexCache={clearCache}
        reviewDetails={reviewsList[index]}
        isPhoneReview={true}
        targetProfilePath={`/${ROUTES_NAMES.PHONE_PROFILE}?pid=${reviewsList[index].targetId}`}
        userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${reviewsList[index].userId}`}
        stateLikeFn={stateLike}
        stateUnLikeFn={stateUnLike}
        fullScreenRoute={`/${ROUTES_NAMES.EXACT_PHONE_REVIEW}?id=${reviewsList[index]._id}`}
        showActionBtn={true}
        deleteReviewFromStore={deleteReviewFromStore}
      />
    );
  };

  return (
    <CustomAppBar showLogo showSearch showProfile>
      <FixedGrid>
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
      </FixedGrid>
    </CustomAppBar>
  );
}

export default Reviews;
