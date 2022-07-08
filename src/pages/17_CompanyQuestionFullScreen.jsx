import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AlonePostsGrid } from "../Components/Grid/AlonePostsGrid";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import CompanyQuestion from "../Components/ReviewCard/companyQuestion";
import { useShowSnackbar } from "../hooks/useShowSnackbar";
import { AnswersList } from "../pages/AnswersList";
import ROUTES_NAMES from "../RoutesNames";
import {
  useAddCommentOnCompanyQuestionMutation,
  useAddReplyOnCompanyQuestionMutation,
  useGetCertainCompanyQuestionQuery,
  useLazyGetCompanyQuestionCommentsQuery,
  useLikeCompanyQuestionCommentMutation,
  useLikeCompanyQuestionReplyMutation,
  useMarkAnswerAsAcceptedMutation,
  useUnLikeCompanyQuestionCommentMutation,
  useUnLikeCompanyQuestionReplyMutation,
  useUnmarkAnswerAsAcceptedMutation,
} from "../services/company_questions";
import { answersListActions } from "../store/answersListSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { questionsActions } from "../store/questionsSlice";

export default function CompanyQuestionFullScreen() {
  const dispatch = useAppDispatch();

  const showSnackbar = useShowSnackbar();

  const isMobile = useTheme().isMobile;

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      console.log("clear answers");
      dispatch(answersListActions.clearComments());
      dispatch(questionsActions.clearReviews());
    };
  }, []);

  const currentUser = useAppSelector((state) => state.auth);

  const commentsList = useAppSelector((state) => state.answersList.newComments);

  const [searchParams] = useSearchParams();
  const reviewId = searchParams.get("id");

  const currentReviewData = useAppSelector(
    (state) => state.questions.newReviews
  )[0];

  const [getComments, {}] = useLazyGetCompanyQuestionCommentsQuery();

  // add comment
  const [addCommentOnCompanyReview] = useAddCommentOnCompanyQuestionMutation();

  // add reply
  const [addReplyOnCompanyReview] = useAddReplyOnCompanyQuestionMutation();

  // like comment
  const [likeComment] = useLikeCompanyQuestionCommentMutation();

  // unlike comment
  const [unLikeComment] = useUnLikeCompanyQuestionCommentMutation();

  // like reply
  const [likeReply] = useLikeCompanyQuestionReplyMutation();
  // unlike reply
  const [unLikeReply] = useUnLikeCompanyQuestionReplyMutation();

  // accept answer
  const [acceptAnswer] = useMarkAnswerAsAcceptedMutation();
  //reject answer
  const [rejectAnswer] = useUnmarkAnswerAsAcceptedMutation();

  // get review from server
  const {
    data: currentReview,
    isLoading: reviewLoading,
    error: reviewError,
  } = useGetCertainCompanyQuestionQuery(reviewId);

  useEffect(() => {
    if (currentReview && currentReview.acceptedAns) {
      console.log("add answer");
      dispatch(
        answersListActions.addAcceptedAnswer({
          acceptedAnswer: currentReviewData.acceptedAns,
        })
      );
    }
  }, [currentReviewData]);

  useEffect(() => {
    if (!reviewLoading) {
      dispatch(questionsActions.clearReviews());
      dispatch(
        questionsActions.addToLoaddedReviews({ newReviews: [currentReview] })
      );
    }
  }, [reviewLoading]);

  const stateLikeCompanyReview = (id) =>
    dispatch(questionsActions.setIsLiked({ id: id, isLiked: true }));

  const stateUnLikeCompanyReview = (id) =>
    dispatch(questionsActions.setIsLiked({ id: id, isLiked: false }));

  // comment like and unlike
  const stateLikeCompanyComment = (id) =>
    dispatch(answersListActions.setIsLiked({ id: id, isLiked: true }));

  const stateUnLikeCompanyComment = (id) =>
    dispatch(answersListActions.setIsLiked({ id: id, isLiked: false }));

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

  // reply like and unlike
  const stateLikeCompanyReply = (id) =>
    dispatch(answersListActions.setIsLiked({ id: id, isLiked: true }));

  const stateUnLikeCompanyReply = (id) =>
    dispatch(answersListActions.setIsLiked({ id: id, isLiked: false }));

  const likeReplyRequest = (commentId, replyId) => {
    likeReply({
      commentId: commentId,
      replyId: replyId,
      doFn: stateLikeCompanyReply,
      unDoFn: stateUnLikeCompanyReply,
    });
  };

  const unLikeReplyRequest = (commentId, replyId) => {
    unLikeReply({
      commentId: commentId,
      replyId: replyId,
      doFn: stateUnLikeCompanyReply,
      unDoFn: stateLikeCompanyReply,
    });
  };

  // answer accept and reject
  const stateAcceptAnswer = (id) =>
    dispatch(answersListActions.setIsAccepted({ id: id, isAccepted: true }));

  const stateRejectAnswer = (id) =>
    dispatch(answersListActions.setIsAccepted({ id: id, isAccepted: false }));

  const acceptAnswerRequest = (questionId, answerId) => {
    acceptAnswer({
      questionId: questionId,
      answerId: answerId,
      doFn: stateAcceptAnswer,
      unDoFn: stateRejectAnswer,
    });
  };

  const rejectAnswerRequest = (questionId, answerId) => {
    rejectAnswer({
      questionId: questionId,
      answerId: answerId,
      doFn: stateRejectAnswer,
      unDoFn: stateAcceptAnswer,
    });
  };

  const addToLoadedComments = (comment) => {
    dispatch(
      answersListActions.addToLoaddedComments({
        newComments: comment,
      })
    );
  };

  const addOneCommentToLoadedComments = (comment, index) => {
    dispatch(
      answersListActions.addNewCommentLocally({
        newComment: comment,
      })
    );
  };

  const addOneReplyToLoadedComments = (comment) => {
    dispatch(
      answersListActions.addNewReplyLocally({
        newComment: comment,
      })
    );
  };

  const submitCommentHandler = async (e) => {
    try {
      const response = await addCommentOnCompanyReview({
        reviewId: reviewId,
        content: e,
        phoneId: currentReviewData.targetId,
      });

      // add comment to store
      const comment = {
        _id: response.data.answer,
        ownedAt: response.data.ownedAt,
        userId: currentUser.uid,
        userName: currentUser.name,
        picture: currentUser.photo,
        content: e,
        createdAt: new Date(),
        likes: 0,
        liked: false,
      };

      addOneCommentToLoadedComments(comment);
    } catch (e) {
      showSnackbar(e.data.status);
    }
  };

  const submitReplyHandler = async (e, commentId) => {
    try {
      const response = await addReplyOnCompanyReview({
        commentId: commentId,
        reply: e,
      });

      // add reply to store
      const reply = {
        _id: response.data.reply,
        userId: currentUser.uid,
        userName: currentUser.name,
        userPicture: currentUser.photo,
        content: e,
        createdAt: new Date(),
        likes: 0,
        liked: false,
        commentId: commentId,
        isReply: true,
      };

      addOneReplyToLoadedComments(reply);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteReviewFromStore = (id) => {
    navigate(-1);
  };

  const stateIncreaseShareCounter = (id) =>
    dispatch(questionsActions.increaseShareCounter({ id: id }));

  const reviewCard = () => {
    return (
      <div>
        {reviewLoading ? (
          <div>Loading review...</div>
        ) : reviewError ? (
          <div>Error</div>
        ) : (
          currentReviewData && (
            <CompanyQuestion
              disableElevation={!isMobile}
              showBottomLine={!isMobile}
              key={currentReviewData._id}
              index={0}
              fullScreen={true}
              isExpanded={true}
              reviewDetails={currentReviewData}
              targetProfilePath={`/${ROUTES_NAMES.COMPANY_PROFILE}/${ROUTES_NAMES.QUESTIONS}?cid=${currentReviewData.targetId}`}
              userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${currentReviewData.userId}`}
              stateLikeFn={stateLikeCompanyReview}
              stateUnLikeFn={stateUnLikeCompanyReview}
              stateShare={stateIncreaseShareCounter}
              showActionBtn={true}
              deleteReviewFromStore={deleteReviewFromStore}
            />
          )
        )}
      </div>
    );
  };

  const [endOfData, setEndOfData] = useState(false);

  // first page
  let p = 1;
  // function loads additional comments
  const loadMore = useCallback(() => {
    if (!endOfData) {
      getComments({ reviewId, round: p }).then((data) => {
        if (data.data.length === 0) {
          setEndOfData(true);
        } else {
          addToLoadedComments(data.data);
          p++;
        }
      });
    }
  }, [p, endOfData]);

  // to load for the first time
  useEffect(() => {
    const timeout = loadMore();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <CustomAppBar showBackBtn showProfile>
      <FixedGrid>
        <AlonePostsGrid>
          <Box>
            {reviewLoading ? (
              <div>Loading review...</div>
            ) : reviewError ? (
              <div>Error</div>
            ) : (
              currentReviewData && (
                <React.Fragment>
                  <div style={{ height: "25px" }}></div>
                  <AnswersList
                    reviewCard={reviewCard}
                    commentsList={commentsList}
                    commentLike={likeCommentRequest}
                    commentUnlike={unLikeCommentRequest}
                    replyLike={likeReplyRequest}
                    replyUnlike={unLikeReplyRequest}
                    addToReviewsList={addToLoadedComments}
                    submitReplyHandler={submitReplyHandler}
                    acceptAnswer={acceptAnswerRequest}
                    rejectAnswer={rejectAnswerRequest}
                    questionOwnerId={currentReviewData.userId}
                    questionId={currentReviewData._id}
                    endOfData={endOfData}
                    loadMore={loadMore}
                    submitCommentHandler={submitCommentHandler}
                  />
                </React.Fragment>
              )
            )}
          </Box>
        </AlonePostsGrid>
      </FixedGrid>
    </CustomAppBar>
  );
}
