import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AlonePostsGrid } from "../Components/Grid/AlonePostsGrid";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import LoadingReviewSkeleton from "../Components/Loaders/LoadingReviewSkeleton";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { PostingField } from "../Components/PostingComponents/PostingField";
import PhoneQuestion from "../Components/ReviewCard/phoneQuestion";
import { useShowSnackbar } from "../hooks/useShowSnackbar";
import { AnswersList } from "../pages/AnswersList";
import ROUTES_NAMES from "../RoutesNames";
import {
  useAddCommentOnPhoneQuestionMutation,
  useAddReplyOnPhoneQuestionMutation,
  useGetCertainPhoneQuestionQuery,
  useLazyGetPhoneQuestionCommentsQuery,
  useLikePhoneQuestionCommentMutation,
  useLikePhoneQuestionReplyMutation,
  useMarkAnswerAsAcceptedMutation,
  useUnLikePhoneQuestionCommentMutation,
  useUnLikePhoneQuestionReplyMutation,
  useUnmarkAnswerAsAcceptedMutation,
} from "../services/phone_questions";
import {
  useReportAPhoneQuestionAnswerMutation,
  useReportAPhoneQuestionAnswerReplyMutation,
  useReportAPhoneReviewCommentMutation,
} from "../services/reports";
import { answersListActions } from "../store/answersListSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { questionsActions } from "../store/questionsSlice";
import { sendReportActions } from "../store/uiSendReportSlice";

export default function PhoneQuestionFullScreen() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const textContainer = useAppSelector((state) => state.language.textContainer);

  const showSnackbar = useShowSnackbar();

  const isMobile = useTheme().isMobile;

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
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

  const [getComments, {}] = useLazyGetPhoneQuestionCommentsQuery();

  // add comment
  const [addCommentOnPhoneReview] = useAddCommentOnPhoneQuestionMutation();

  // add reply
  const [addReplyOnPhoneReview] = useAddReplyOnPhoneQuestionMutation();

  // like comment
  const [likeComment] = useLikePhoneQuestionCommentMutation();

  // unlike comment
  const [unLikeComment] = useUnLikePhoneQuestionCommentMutation();

  // like reply
  const [likeReply] = useLikePhoneQuestionReplyMutation();
  // unlike reply
  const [unLikeReply] = useUnLikePhoneQuestionReplyMutation();

  // accept answer
  const [acceptAnswer] = useMarkAnswerAsAcceptedMutation();
  //reject answer
  const [rejectAnswer] = useUnmarkAnswerAsAcceptedMutation();

  // report a comment
  const [reportAPhoneAnswer] = useReportAPhoneQuestionAnswerMutation();
  // report a reply
  const [reportAnswerReply] = useReportAPhoneQuestionAnswerReplyMutation();
  // Comment Report Function
  const answerReportFunction = (answerId) => {
    dispatch(
      sendReportActions.showSendReport({
        reportAction: async (reportContent) =>
          reportAPhoneAnswer({
            quesId: reviewId,
            answerId: answerId,
            reportContent: reportContent,
          }),
      })
    );
  };
  // Comment Reply Report Function
  const replyReportFunction = (answerId, replyId) => {
    dispatch(
      sendReportActions.showSendReport({
        reportAction: async (reportContent) =>
          reportAnswerReply({
            quesId: reviewId,
            answerId: answerId,
            replyId: replyId,
            reportContent: reportContent,
          }),
      })
    );
  };
  // get review from server
  const {
    data: currentReview,
    isLoading: reviewLoading,
    error: reviewError,
  } = useGetCertainPhoneQuestionQuery(reviewId);

  useEffect(() => {
    if (currentReview && currentReview.acceptedAns) {
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

  const stateLikePhoneReview = (id) =>
    dispatch(questionsActions.setIsLiked({ id: id, isLiked: true }));

  const stateUnLikePhoneReview = (id) =>
    dispatch(questionsActions.setIsLiked({ id: id, isLiked: false }));

  // comment like and unlike
  const stateLikePhoneComment = (id) =>
    dispatch(answersListActions.setIsLiked({ id: id, isLiked: true }));

  const stateUnLikePhoneComment = (id) =>
    dispatch(answersListActions.setIsLiked({ id: id, isLiked: false }));

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

  // reply like and unlike
  const stateLikePhoneReply = (commentId, replyId) => {
    dispatch(
      answersListActions.setReplyIsLiked({
        commentId: commentId,
        replyId: replyId,
        isLiked: true,
      })
    );
  };

  const stateUnLikePhoneReply = (commentId, replyId) => {
    dispatch(
      answersListActions.setReplyIsLiked({
        commentId: commentId,
        replyId: replyId,
        isLiked: false,
      })
    );
  };

  const likeReplyRequest = (commentId, replyId) => {
    likeReply({
      commentId: commentId,
      replyId: replyId,
      doFn: stateLikePhoneReply,
      unDoFn: stateUnLikePhoneReply,
    });
  };

  const unLikeReplyRequest = (commentId, replyId) => {
    unLikeReply({
      commentId: commentId,
      replyId: replyId,
      doFn: stateUnLikePhoneReply,
      unDoFn: stateLikePhoneReply,
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

  const addOneCommentToLoadedComments = (comment) => {
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
      const response = await addCommentOnPhoneReview({
        reviewId: reviewId,
        content: e,
        phoneId: currentReviewData.targetId,
        phoneName: currentReviewData.targetName,
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
        replies: [],
      };

      addOneCommentToLoadedComments(comment);
    } catch (e) {
      showSnackbar(e.data.status);
    }
  };

  const submitReplyHandler = async (e, commentId) => {
    try {
      const response = await addReplyOnPhoneReview({
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
    } catch (e) {}
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
          <LoadingReviewSkeleton />
        ) : reviewError ? (
          <div>Error</div>
        ) : (
          currentReviewData && (
            <PhoneQuestion
              disableElevation={!isMobile}
              showBottomLine={!isMobile}
              key={currentReviewData._id}
              index={0}
              fullScreen={true}
              isExpanded={true}
              reviewDetails={currentReviewData}
              isPhoneReview={true}
              targetProfilePath={`/${ROUTES_NAMES.PHONE_PROFILE}/${ROUTES_NAMES.QUESTIONS}?pid=${currentReviewData.targetId}`}
              userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${currentReviewData.userId}`}
              stateLikeFn={stateLikePhoneReview}
              stateUnLikeFn={stateUnLikePhoneReview}
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
              <LoadingReviewSkeleton />
            ) : reviewError ? (
              <div>Error</div>
            ) : (
              currentReviewData && (
                <React.Fragment>
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
                    answerReportFunction={answerReportFunction}
                    replyReportFunction={replyReportFunction}
                  />
                </React.Fragment>
              )
            )}
          </Box>
        </AlonePostsGrid>
      </FixedGrid>
      {isMobile && (
        <div
          style={{
            width: "100%",
            position: "fixed",
            padding: "6px",
            bottom: -1,
            left: 0,
            background: theme.palette.interactionCard.backgroundMobileColor,
          }}
        >
          <PostingField
            placeholder={textContainer.writeAComment}
            onSubmit={(comment) => submitCommentHandler(comment)}
          />
        </div>
      )}
    </CustomAppBar>
  );
}
