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
  useUnLikeCompanyQuestionCommentMutation,
} from "../../services/company_questions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { questionsActions } from "../../store/questionsSlice";
import { postingModalActions } from "../../store/uiPostingModalSlice";
import VirtualReviewList from "../VirtualListWindowScroll";

export function CompanyQuestions() {
  const dispatch = useAppDispatch();
  const { companyName } = useOutletContext();
  const textContainer = useAppSelector((state) => state.language.textContainer);

  useEffect(() => {
    return () => {
      console.log("clear questions");
      setPage(1)
      dispatch(questionsActions.clearReviews());
    };
  }, []);

  const reviewsList = useAppSelector((state) => state.questions.newReviews);
  const [page, setPage] = useState(1);

  const [searchParams] = useSearchParams();
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
  const acceptedAnswerWidget = (review) => {
    if (review.acceptedAns) {
      return (
        <Answer
          commentId={review.acceptedAns._id}
          date={review.acceptedAns.createdAt}
          userId={review.acceptedAns._id}
          userName={review.acceptedAns.userName}
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
        />
      );
    }
  };

  const stateIncreaseShareCounter = (id) =>
    dispatch(questionsActions.increaseShareCounter({ id: id }));

  const reviewCard = (review) => {
    return (
      <CompanyQuestion
        key={review._id}
        index={0}
        fullScreen={false}
        isExpanded={false}
        reviewDetails={review}
        isPhoneReview={false}
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

  return (
    <AlonePostsGrid>
      <div style={{ height: "20px" }}></div>
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
      <div style={{ height: "36px" }}></div>

      <VirtualReviewList
        endOfData={endOfData}
        loadMore={loadMore}
        reviewCard={reviewCard}
        reviewsList={reviewsList}
      />
    </AlonePostsGrid>
  );
}
