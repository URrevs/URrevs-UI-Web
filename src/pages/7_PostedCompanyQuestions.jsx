import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Answer } from "../Components/Interactions/Answer";
import CompanyQuestion from "../Components/ReviewCard/companyQuestion";
import ROUTES_NAMES from "../RoutesNames";
import {
  useGetOtherUserCompanyQuestionsQuery,
  useLikeCompanyQuestionCommentMutation,
  useUnLikeCompanyQuestionCommentMutation,
} from "../services/company_questions";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { questionsActions } from "../store/questionsSlice";
import VirtualReviewList from "./VirtualListWindowScroll";

export function PostedCompanyQuestions() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      console.log("clear questions");
      dispatch(questionsActions.clearReviews());
    };
  }, []);

  const reviewsList = useAppSelector((state) => state.questions.newReviews);
  const [page, setPage] = useState(1);

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const { data, isLoading, isFetching, error } =
    useGetOtherUserCompanyQuestionsQuery({ round: page, uid: userId });

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

  // like comment
  const [likeComment] = useLikeCompanyQuestionCommentMutation();
  // unlike comment
  const [unLikeComment] = useUnLikeCompanyQuestionCommentMutation();

  // comment like and unlike
  const stateLikePhoneComment = (id) =>
    dispatch(questionsActions.voteForAcceptedAnswer({ id: id, isLiked: true }));

  const stateUnLikePhoneComment = (id) =>
    dispatch(
      questionsActions.voteForAcceptedAnswer({ id: id, isLiked: false })
    );

  const likeCommentRequest = (id) => {
    likeComment({
      commentId: id,
      doFn: stateLikePhoneComment,
      unDoFn: stateUnLikePhoneComment,
    });
  };

  const unLikeCommentRequest = (id) => {
    unLikeComment({
      commentId: id,
      doFn: stateUnLikePhoneComment,
      unDoFn: stateLikePhoneComment,
    });
  };

  const stateIncreaseShareCounter = (id) =>
    dispatch(questionsActions.increaseShareCounter({ id: id }));

  // add accepted answer if found
  const acceptedAnswerWidget = (index) => {
    if (reviewsList[index].acceptedAns) {
      return (
        <Answer
          commentId={reviewsList[index].acceptedAns._id}
          date={reviewsList[index].acceptedAns.createdAt}
          userId={reviewsList[index].acceptedAns._id}
          userName={reviewsList[index].acceptedAns.userName}
          likes={reviewsList[index].acceptedAns.upvotes}
          text={reviewsList[index].acceptedAns.content}
          commentLike={likeCommentRequest}
          commentUnlike={unLikeCommentRequest}
          avatar={reviewsList[index].acceptedAns.picture}
          ownerId={reviewsList[index].acceptedAns.userId}
          ownedAt={reviewsList[index].acceptedAns.ownedAt}
          questionOwnerId={reviewsList[index].userId}
          questionId={reviewsList[index]._id}
          acceptAnswer={() => {}}
          rejectAnswer={() => {}}
          acceptedAnswer={true}
          showReply={false}
          upvoted={reviewsList[index].acceptedAns.upvoted}
        />
      );
    }
  };

  const reviewCard = (index, clearCache) => {
    return (
      <CompanyQuestion
        key={reviewsList[index]._id}
        index={0}
        fullScreen={false}
        isExpanded={false}
        clearIndexCache={clearCache}
        reviewDetails={reviewsList[index]}
        isPhoneReview={false}
        targetProfilePath={`/${ROUTES_NAMES.COMPANY_PROFILE}/${ROUTES_NAMES.QUESTIONS}?cid=${reviewsList[index].targetId}`}
        userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${reviewsList[index].userId}`}
        stateLikeFn={stateLike}
        stateUnLikeFn={stateUnLike}
        stateShare={stateIncreaseShareCounter}
        showActionBtn={true}
        deleteReviewFromStore={deleteReviewFromStore}
        acceptedAnswerWidget={
          reviewsList[index].acceptedAns &&
          acceptedAnswerWidget.bind(null, index)
        }
      />
    );
  };

  return (
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
  );
}
