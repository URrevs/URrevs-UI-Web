import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { AlonePostsGrid } from "../../Components/Grid/AlonePostsGrid";
import { Answer } from "../../Components/Interactions/Answer";
import { PostingComponent } from "../../Components/PostingComponents/PostingComponent";
import CompanyQuestion from "../../Components/ReviewCard/companyQuestion";
import ROUTES_NAMES from "../../RoutesNames";
import {
  useGetCompanyQuestionsQuery,
  useLikeCompanyQuestionCommentMutation,
  useUnLikeCompanyQuestionCommentMutation
} from "../../services/company_questions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { questionsActions } from "../../store/questionsSlice";
import { postingModalActions } from "../../store/uiPostingModalSlice";
import VirtualReviewList from "../VirtualListWindowScroll";

export function CompanyQuestions() {
  const dispatch = useAppDispatch();
  const { companyName } = useOutletContext();
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const theme = useTheme();
  useEffect(() => {
    return () => {
      console.log("clear questions");
      dispatch(questionsActions.clearReviews());
    };
  }, []);

  const reviewsList = useAppSelector((state) => state.questions.newReviews);
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const cid = searchParams.get("cid");

  const { data, isLoading, isFetching, error } = useGetCompanyQuestionsQuery({
    round: page,
    cid: cid,
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
  const [likeComment] = useLikeCompanyQuestionCommentMutation();
  // unlike comment
  const [unLikeComment] = useUnLikeCompanyQuestionCommentMutation();

  // comment like and unlike
  const stateLikeCompanyComment = (id) =>
    dispatch(questionsActions.voteForAcceptedAnswer({ id: id, isLiked: true }));

  const stateUnLikeCompanyComment = (id) =>
    dispatch(
      questionsActions.voteForAcceptedAnswer({ id: id, isLiked: false })
    );

  const likeCommentRequest = (id) => {
    likeComment({
      commentId: id,
      doFn: stateLikeCompanyComment,
      unDoFn: stateUnLikeCompanyComment,
    });
  };

  const unLikeCommentRequest = (id) => {
    unLikeComment({
      commentId: id,
      doFn: stateUnLikeCompanyComment,
      unDoFn: stateLikeCompanyComment,
    });
  };

  // add accepted answer if found
  const acceptedAnswerWidget = (index) => {
    if (reviewsList[index].acceptedAns) {
      return (
        <Answer
          commentId={reviewsList[index].acceptedAns._id}
          date={reviewsList[index].acceptedAns.createdAt}
          user={reviewsList[index].acceptedAns.userName}
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
      <CompanyQuestion
        key={reviewsList[index]._id}
        index={0}
        fullScreen={false}
        isExpanded={false}
        clearIndexCache={clearCache}
        reviewDetails={reviewsList[index]}
        isPhoneReview={false}
        targetProfilePath={`/${ROUTES_NAMES.PHONE_PROFILE}/${ROUTES_NAMES.QUESTIONS}?pid=${reviewsList[index].targetId}`}
        userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${reviewsList[index].userId}`}
        stateLikeFn={stateLike}
        stateUnLikeFn={stateUnLike}
        stateShare={stateIncreaseShareCounter}
        showActionBtn={true}
        deleteReviewFromStore={deleteReviewFromStore}
        acceptedAnswerWidget={acceptedAnswerWidget.bind(null, index)}
      />
    );
  };

  return (
    <AlonePostsGrid>
      <PostingComponent
        label={textContainer.youCanAddQuestion}
        placeholder={textContainer.writeYourQuestionP}
        params={{
          disabled: true,
          onClick: () => {
            dispatch(
              postingModalActions.showPostingModal({
                tab: 1,
                type: "company",
                name: companyName,
                id: cid,
              })
            );
          },
        }}
      />

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
