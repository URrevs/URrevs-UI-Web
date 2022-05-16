import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CustomAppBar } from "../../Components/MainLayout/AppBar/CustomAppBar";
import { FilterTabbar } from "../../Components/Tabbar/FilterTabbar";
import { useGetCompanyReviewsQuery } from "../../services/company_reviews";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { reviewsActions } from "../../store/reviewsSlice";
import VirtualReviewList from "../VirtualListWindowScroll";
import ROUTES_NAMES from "../../RoutesNames";
import CompanyReview from "../../Components/ReviewCard/CompanyReview";

export function CompanyReviews() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("clear reviews");

    dispatch(reviewsActions.clearReviews());
  }, []);

  const reviewsList = useAppSelector((state) => state.reviews.newReviews);
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const cid = searchParams.get("cid");

  const { data, isLoading, isFetching, error } = useGetCompanyReviewsQuery({
    round: page,
    cid: cid,
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

  const reviewCard = (index, clearCache) => {
    return (
      <CompanyReview
        index={index}
        fullScreen={false}
        isExpanded={false}
        clearIndexCache={clearCache}
        reviewDetails={reviewsList[index]}
        isPhoneReview={true}
        targetProfilePath={`/${ROUTES_NAMES.COMPANY_PROFILE}?cid=${reviewsList[index].targetId}`}
        userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${reviewsList[index].userId}`}
        stateLikeFn={stateLike.bind(null, reviewsList[index]._id)}
        stateUnLikeFn={stateUnLike.bind(null, reviewsList[index]._id)}
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
      addToReviewsList={addToReviewsList}
      increasePage={increasePage}
    />
  );
}
