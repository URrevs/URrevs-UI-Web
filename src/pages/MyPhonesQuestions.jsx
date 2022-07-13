import { useEffect, useState } from "react";
import { Answer } from "../Components/Interactions/Answer";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import PhoneQuestion from "../Components/ReviewCard/phoneQuestion";
import ROUTES_NAMES from "../RoutesNames";
import {
  useGetMyPhonesQuestionsQuery,
  useLikePhoneQuestionCommentMutation,
  useUnLikePhoneQuestionCommentMutation,
} from "../services/phone_questions";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { questionsActions } from "../store/questionsSlice";
import VirtualReviewList from "./VirtualListWindowScroll";

export function MyPhonesQuestions() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      setPage(1);
      dispatch(questionsActions.clearReviews());
    };
  }, []);

  const reviewsList = useAppSelector((state) => state.questions.newReviews);
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } =
    useGetMyPhonesQuestionsQuery(page);

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
  const acceptedAnswerWidget = (review) => {
    if (review.acceptedAns) {
      return (
        <Answer
          commentId={review.acceptedAns._id}
          date={review.acceptedAns.createdAt}
          likes={review.acceptedAns.upvotes}
          text={review.acceptedAns.content}
          commentLike={likeCommentRequest}
          commentUnlike={unLikeCommentRequest}
          avatar={review.acceptedAns.picture}
          ownerId={review.acceptedAns.userId}
          ownedAt={review.acceptedAns.ownedAt}
          questionOwnerId={review.userId}
          questionId={review._id}
          acceptAnswer={() => {}}
          rejectAnswer={() => {}}
          acceptedAnswer={true}
          showReply={false}
          upvoted={review.acceptedAns.upvoted}
          userId={review.acceptedAns.userId}
          userName={review.acceptedAns.userName}
        />
      );
    }
  };

  const stateIncreaseShareCounter = (id) =>
    dispatch(questionsActions.increaseShareCounter({ id: id }));

  const reviewCard = (review) => {
    return (
      <PhoneQuestion
        key={review._id}
        index={0}
        fullScreen={false}
        isExpanded={false}
        reviewDetails={review}
        isPhoneReview={true}
        targetProfilePath={`/${ROUTES_NAMES.PHONE_PROFILE}/${ROUTES_NAMES.QUESTIONS}?pid=${review.targetId}`}
        userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${review.userId}`}
        stateLikeFn={stateLike}
        stateUnLikeFn={stateUnLike}
        stateShare={stateIncreaseShareCounter}
        showActionBtn={true}
        deleteReviewFromStore={deleteReviewFromStore}
        acceptedAnswerWidget={
          review.acceptedAns && acceptedAnswerWidget.bind(null, review)
        }
      />
    );
  };

  useEffect(() => {
    if (data) {
      addToReviewsList(data);

      if (data.length === 0) {
        setEndOfData(true);
      }
    }
  }, [data]);

  const [endOfData, setEndOfData] = useState(false);

  // function loads additional comments
  const loadMore = () => {
    if (!endOfData && !isFetching) {
      increasePage();
    }
  };

  const textContainer = useAppSelector((state) => state.language.textContainer);

  return (
    <CustomAppBar
      showLabel
      label={textContainer.questionsAboutMyProducts}
      showBackBtn
    >
      <VirtualReviewList
        endOfData={endOfData}
        loadMore={loadMore}
        reviewCard={reviewCard}
        reviewsList={reviewsList}
      />
    </CustomAppBar>
  );
}
