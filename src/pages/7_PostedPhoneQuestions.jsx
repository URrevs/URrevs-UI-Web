import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import PhoneQuestion from "../Components/ReviewCard/phoneQuestion";
import { FilterTabbar } from "../Components/Tabbar/FilterTabbar";
import ROUTES_NAMES from "../RoutesNames";
import { useGetOtherUserPhoneQuestionsQuery } from "../services/phone_questions";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { questionsActions } from "../store/questionsSlice";
import VirtualReviewList from "./VirtualListWindowScroll";

export default function PostedPhoneQuestions() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("clear questions");

    dispatch(questionsActions.clearReviews());
  }, []);

  const reviewsList = useAppSelector((state) => state.questions.newReviews);
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const { data, isLoading, isFetching, error } =
    useGetOtherUserPhoneQuestionsQuery({ round: page, uid: userId });

  const stateLike = (id) =>
    dispatch(questionsActions.setIsLiked({ id: id, isLiked: true }));

  const stateUnLike = (id) =>
    dispatch(questionsActions.setIsLiked({ id: id, isLiked: false }));

  const addToReviewsList = () =>
    dispatch(
      questionsActions.addToLoaddedReviews({
        newReviews: data,
      })
    );

  const increasePage = () => setPage(page + 1);

  const deleteReviewFromStore = (id) => {
    dispatch(questionsActions.clearReviews());
    const n = reviewsList.filter((review) => review._id !== id);

    dispatch(
      questionsActions.addToLoaddedReviews({
        newReviews: n,
      })
    );
  };

  const reviewCard = (index, clearCache) => {
    return (
      <PhoneQuestion
        key={reviewsList[index]._id}
        index={0}
        fullScreen={false}
        isExpanded={false}
        clearIndexCache={clearCache}
        reviewDetails={reviewsList[index]}
        isPhoneReview={true}
        targetProfilePath={`/${ROUTES_NAMES.PHONE_PROFILE}?pid=${reviewsList[index].targetId}`}
        userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${reviewsList[index].userId}`}
        stateLikeFn={stateLike}
        stateUnLikeFn={stateUnLike}
        showActionBtn={true}
        deleteReviewFromStore={deleteReviewFromStore}
      />
    );
  };

  return (
    <CustomAppBar
      showLabel
      label="الاسئلة المطروحة"
      showBackBtn
      tabBar={<FilterTabbar />}
    >
      <FixedGrid>
        <VirtualReviewList
          reviewCard={reviewCard}
          reviewsList={reviewsList}
          page={page}
          data={data}
          isFetching={isFetching}
          error={error}
          isLoading={isLoading}
          addToReviewsList={addToReviewsList}
          increasePage={increasePage}
        />
      </FixedGrid>
    </CustomAppBar>
  );
}
