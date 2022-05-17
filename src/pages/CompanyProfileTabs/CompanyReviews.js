import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CompanyOverviewCard } from "../../Components/OverviewCard/CompanyOverviewCard";
import CompanyReview from "../../Components/ReviewCard/CompanyReview";
import ROUTES_NAMES from "../../RoutesNames";
import { useGetCompanyReviewsQuery } from "../../services/company_reviews";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { reviewsActions } from "../../store/reviewsSlice";
import VirtualReviewList from "../VirtualListWindowScroll";

export function CompanyReviews({ viewer, companyRating, companyName, type }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("clear reviews");

    dispatch(reviewsActions.clearReviews());
  }, []);

  let reviewsList = useAppSelector((state) => state.reviews.newReviews);
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

  const deleteReviewFromStore = (id) => {
    dispatch(reviewsActions.clearReviews());
    const n = reviewsList.filter((review) => review._id !== id);
    console.log(n);

    dispatch(
      reviewsActions.addToLoaddedReviews({
        newReviews: n,
      })
    );
  };

  const reviewCard = (index, clearCache) => {
    return (
      <CompanyReview
        key={reviewsList[index]._id}
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
        showActionBtn={true}
        deleteReviewFromStore={deleteReviewFromStore}
      />
    );
  };

  return (
    <Box>
      <CompanyOverviewCard
        companyName={companyName}
        companyRating={companyRating}
        type="شركة"
        viewer={viewer}
      />
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
    </Box>
  );
}
