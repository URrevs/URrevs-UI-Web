import React from "react";
import { useSearchParams } from "react-router-dom";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { FilterTabbar } from "../Components/Tabbar/FilterTabbar";
import { useGetOtherUserPhoneReviewsQuery } from "../services/reviews";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { reviewsActions } from "../store/reviewsSlice";
import Virtual from "./VirtualListWindowScroll";

export default function PostedReviews() {
  const dispatch = useAppDispatch();
  const reviewsList = useAppSelector((state) => state.reviews.newReviews);
  const page = useAppSelector((state) => state.reviews.page);

  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const { data, isLoading, isFetching, error } =
    useGetOtherUserPhoneReviewsQuery({ round: page, uid: userId });

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
    <CustomAppBar
      showLabel
      label="مراجعاتي"
      showBackBtn
      tabBar={<FilterTabbar />}
    >
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
