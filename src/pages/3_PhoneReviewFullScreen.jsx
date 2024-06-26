import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import DocumentMeta from "react-document-meta";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FullScreenError } from "../Components/FullScreenError";
import { AlonePostsGrid } from "../Components/Grid/AlonePostsGrid";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import LoadingReviewSkeleton from "../Components/Loaders/LoadingReviewSkeleton";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { PostingField } from "../Components/PostingComponents/PostingField";
import PhoneReview from "../Components/ReviewCard/PhoneReview";
import { useShowSnackbar } from "../hooks/useShowSnackbar";
import ROUTES_NAMES from "../RoutesNames";
import {
  useAddCommentOnPhoneReviewMutation,
  useAddReplyOnPhoneReviewMutation,
  useGetCertainPhoneReviewQuery,
  useLazyGetPhoneReviewCommentsQuery,
  useLikePhoneReviewCommentMutation,
  useLikePhoneReviewReplyMutation,
  useUnLikePhoneReviewCommentMutation,
  useUnLikePhoneReviewReplyMutation,
} from "../services/phone_reviews";
import {
  useReportAPhoneReviewCommentMutation,
  useReportAPhoneReviewCommentReplyMutation,
} from "../services/reports";
import { commentsListActions } from "../store/commentsListSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { reviewsActions } from "../store/reviewsSlice";
import { sendReportActions } from "../store/uiSendReportSlice";
import CommentsList from "./CommentsList";

export default function PhoneReviewFullScreen() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const showSnackbar = useShowSnackbar();
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const isMobile = useTheme().isMobile;

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(commentsListActions.clearComments());
      dispatch(reviewsActions.clearReviews());
    };
  }, []);

  const currentUser = useAppSelector((state) => state.auth);

  const commentsList = useAppSelector(
    (state) => state.commentsList.newComments
  );

  const [searchParams] = useSearchParams();
  const reviewId = searchParams.get("id");

  const currentReviewData = useAppSelector(
    (state) => state.reviews.newReviews
  )[0];

  const [getComments, {}] = useLazyGetPhoneReviewCommentsQuery();

  // add comment
  const [addCommentOnPhoneReview] = useAddCommentOnPhoneReviewMutation();

  // add reply
  const [addReplyOnPhoneReview] = useAddReplyOnPhoneReviewMutation();

  // like comment
  const [likeComment] = useLikePhoneReviewCommentMutation();

  // unlike comment
  const [unLikeComment] = useUnLikePhoneReviewCommentMutation();

  // like reply
  const [likeReply] = useLikePhoneReviewReplyMutation();
  // unlike reply
  const [unLikeReply] = useUnLikePhoneReviewReplyMutation();
  // report a comment
  const [reportAPhoneComment] = useReportAPhoneReviewCommentMutation();
  // report a reply
  const [reportACommentReply] = useReportAPhoneReviewCommentReplyMutation();
  // Comment Report Function
  const commentReportFunction = (commentId) => {
    dispatch(
      sendReportActions.showSendReport({
        reportAction: async (reportContent) =>
          reportAPhoneComment({
            revId: reviewId,
            commentId: commentId,
            reportContent: reportContent,
          }),
      })
    );
  };
  // Comment Reply Report Function
  const replyReportFunction = (commentId, replyId) => {
    dispatch(
      sendReportActions.showSendReport({
        reportAction: async (reportContent) =>
          reportACommentReply({
            revId: reviewId,
            commentId: commentId,
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
  } = useGetCertainPhoneReviewQuery(reviewId);

  useEffect(() => {
    if (!reviewLoading) {
      dispatch(reviewsActions.clearReviews());
      dispatch(
        reviewsActions.addToLoaddedReviews({ newReviews: [currentReview] })
      );
    }
  }, [currentReview, dispatch]);

  const stateLikePhoneReview = (id) =>
    dispatch(reviewsActions.setIsLiked({ id: id, isLiked: true }));

  const stateUnLikePhoneReview = (id) =>
    dispatch(reviewsActions.setIsLiked({ id: id, isLiked: false }));

  // comment like and unlike
  const stateLikePhoneComment = (id) =>
    dispatch(commentsListActions.setIsLiked({ id: id, isLiked: true }));

  const stateUnLikePhoneComment = (id) =>
    dispatch(commentsListActions.setIsLiked({ id: id, isLiked: false }));

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
      commentsListActions.setReplyIsLiked({
        commentId: commentId,
        replyId: replyId,
        isLiked: true,
      })
    );
  };

  const stateUnLikePhoneReply = (commentId, replyId) => {
    dispatch(
      commentsListActions.setReplyIsLiked({
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

  const addToLoadedComments = (data) =>
    dispatch(
      commentsListActions.addToLoaddedComments({
        newComments: data,
      })
    );

  const addOneCommentToLoadedComments = (comment) => {
    dispatch(
      commentsListActions.addNewCommentLocally({
        newComment: comment,
      })
    );
  };
  const addOneReplyToLoadedComments = (comment) => {
    dispatch(
      commentsListActions.addNewReplyLocally({
        newComment: comment,
      })
    );
  };

  const submitCommentHandler = async (text) => {
    try {
      const response = await addCommentOnPhoneReview({
        reviewId: reviewId,
        comment: text,
      });

      // add comment to store
      const comment = {
        _id: response.data.comment,
        userId: currentUser.uid,
        userName: currentUser.name,
        userPicture: currentUser.photo,
        content: text,
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

  const submitReplyHandler = async (text, commentId) => {
    try {
      const response = await addReplyOnPhoneReview({
        commentId: commentId,
        reply: text,
      });

      // add reply to store
      const reply = {
        _id: response.data.reply,
        userId: currentUser.uid,
        userName: currentUser.name,
        userPicture: currentUser.photo,
        content: text,
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
    dispatch(reviewsActions.increaseShareCounter({ id: id }));

  const reviewCard = () => {
    return (
      <div>
        {reviewLoading ? (
          <LoadingReviewSkeleton />
        ) : reviewError ? (
          <FullScreenError />
        ) : (
          currentReviewData && (
            <PhoneReview
              disableElevation={!isMobile}
              showBottomLine={!isMobile}
              key={currentReviewData._id}
              index={0}
              fullScreen={true}
              isExpanded={true}
              reviewDetails={currentReviewData}
              isPhoneReview={true}
              targetProfilePath={`/${ROUTES_NAMES.PHONE_PROFILE}/${ROUTES_NAMES.REVIEWS}?pid=${currentReviewData.targetId}`}
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
              <FullScreenError />
            ) : (
              currentReviewData && (
                <DocumentMeta
                  {...{
                    description: `${currentReviewData.targetName} phone pros and cons - ${currentReviewData.targetName} مميزات وعيوب هاتف `,
                    canonical: `https://${window.location.hostname}/phone-review/?id=${currentReviewData._id}`,
                    meta: {
                      charset: "utf-8",
                      name: {
                        keywords: `reviews,review,phone,pros,cons,${currentReviewData.targetName},مميزات,عيوب,مراجعات,هاتف`,
                      },
                    },
                  }}
                >
                  <CommentsList
                    commentsList={commentsList}
                    reviewCard={reviewCard}
                    submitReplyHandler={submitReplyHandler}
                    submitCommentHandler={submitCommentHandler}
                    endOfData={endOfData}
                    loadMore={loadMore}
                    likeCommentRequest={likeCommentRequest}
                    unLikeCommentRequest={unLikeCommentRequest}
                    likeReplyRequest={likeReplyRequest}
                    unLikeReplyRequest={unLikeReplyRequest}
                    commentReportFunction={commentReportFunction}
                    replyReportFunction={replyReportFunction}
                  />
                </DocumentMeta>
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
