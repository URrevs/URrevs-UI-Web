import React, { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { AlonePostsGrid } from "../../Components/Grid/AlonePostsGrid";
import { Answer } from "../../Components/Interactions/Answer";
import { PostingComponent } from "../../Components/PostingComponents/PostingComponent";
import PhoneQuestion from "../../Components/ReviewCard/phoneQuestion";
import ROUTES_NAMES from "../../RoutesNames";
import {
  useGetPhoneQuestionsQuery,
  useLikePhoneQuestionCommentMutation,
  useUnLikePhoneQuestionCommentMutation,
} from "../../services/phone_questions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { questionsActions } from "../../store/questionsSlice";
import { postingModalActions } from "../../store/uiPostingModalSlice";
import VirtualReviewList from "../VirtualListWindowScroll";

export function ProductQuestions() {
  const dispatch = useAppDispatch();
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const { phoneName } = useOutletContext();
  useEffect(() => {
    return () => {
      console.log("clear questions");
      dispatch(questionsActions.clearReviews());
    };
  }, [dispatch]);

  const reviewsList = useAppSelector((state) => state.questions.newReviews);
  const [page, setPage] = useState(1);

  const [searchParams] = useSearchParams();
  const pid = searchParams.get("pid");

  const { data, isLoading, isFetching, error } = useGetPhoneQuestionsQuery({
    round: page,
    pid: pid,
  });

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
  const [likeComment] = useLikePhoneQuestionCommentMutation();
  // unlike comment
  const [unLikeComment] = useUnLikePhoneQuestionCommentMutation();

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

  const stateIncreaseShareCounter = (id) =>
    dispatch(questionsActions.increaseShareCounter({ id: id }));

  const reviewCard = (index, clearCache) => {
    return (
      <PhoneQuestion
        key={reviewsList[index]._id}
        index={0}
        fullScreen={false}
        isExpanded={false}
        reviewDetails={reviewsList[index]}
        isPhoneReview={true}
        targetProfilePath={`/${ROUTES_NAMES.PHONE_PROFILE}/${ROUTES_NAMES.QUESTIONS}?pid=${reviewsList[index].targetId}`}
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
    <AlonePostsGrid>
      <div style={{ height: "20px" }} />

      <PostingComponent
        label={textContainer.youCanAddQuestion}
        placeholder={textContainer.writeYourQuestionP}
        params={{
          disabled: true,
          onClick: () => {
            dispatch(
              postingModalActions.showPostingModal({
                type: "phone",
                id: pid,
                name: phoneName,
                tab: 1, //AddReview Tab
              })
            );
          },
        }}
      />
      <div style={{ height: "18px" }} />

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
    </AlonePostsGrid>
  );
}
