import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CustomAppBar } from "../../Components/MainLayout/AppBar/CustomAppBar";
import {
  useGetAllReviewsQuery,
  useGetPhoneReviewsQuery,
} from "../../services/reviews";
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

  const increasePage = () => setPage(page + 1);

  return (
    <VirtualReviewList
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
