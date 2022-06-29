import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CellMeasurerCache } from "react-virtualized";
import { AlonePostsGrid } from "../Components/Grid/AlonePostsGrid";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import { loadingSkeletonHeight } from "../Components/Loaders/LoadingReviewSkeleton";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import CompanyReview from "../Components/ReviewCard/CompanyReview";
import ROUTES_NAMES from "../RoutesNames";
import {
  useAddCommentOnCompanyReviewMutation,
  useAddReplyOnCompanyReviewMutation,
  useGetCertainCompanyReviewQuery,
  useGetCompanyReviewCommentsQuery,
  useLikeCompanyReviewCommentMutation,
  useLikeCompanyReviewReplyMutation,
  useUnLikeCompanyReviewCommentMutation,
  useUnLikeCompanyReviewReplyMutation,
} from "../services/company_reviews";
import { commentsListActions } from "../store/commentsListSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { reviewsActions } from "../store/reviewsSlice";
import CommentsList from "./CommentsList";

const cache = new CellMeasurerCache({
  fixedWidth: true,
  fixedHeight: false,
  defaultHeight: loadingSkeletonHeight,
});

export default function CompanyReviewFullScreen() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      console.log("clear comments");
      dispatch(commentsListActions.clearComments());
    };
  }, []);

  const currentUser = useAppSelector((state) => state.auth);

  const commentsList = useAppSelector(
    (state) => state.commentsList.newComments
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const reviewId = searchParams.get("id");

  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } =
    useGetCompanyReviewCommentsQuery({ reviewId, round: page });

  // add comment
  const [addCommentLoading, setAddCommentLoading] = useState(false);
  const [addCommentError, setAddCommentError] = useState(null);
  const [addCommentOnPhoneReview] = useAddCommentOnCompanyReviewMutation();

  // add reply
  const [addReplyLoading, setAddReplyLoading] = useState(false);
  const [addReplyError, setAddReplyError] = useState(null);
  const [addReplyOnPhoneReview] = useAddReplyOnCompanyReviewMutation();

  // like comment
  const [likeComment] = useLikeCompanyReviewCommentMutation();

  // unlike comment
  const [unLikeComment] = useUnLikeCompanyReviewCommentMutation();

  // like reply
  const [likeReply] = useLikeCompanyReviewReplyMutation();
  // unlike reply
  const [unLikeReply] = useUnLikeCompanyReviewReplyMutation();

  const [ex, setEx] = useState(false);
  const clearCache = (index) => {
    setEx(!ex);
    if (index === 0) {
      cache.clear(0);
    } else {
      cache.clear(index);
    }
  };

  // // get this review from store
  // const currentReview = useAppSelector((state) => state.reviews.newReviews).find(
  //   (element) => {
  //     return element._id === reviewId;
  //   }
  // );

  // get review from server
  const {
    data: currentReview,
    isLoading: reviewLoading,
    error: reviewError,
  } = useGetCertainCompanyReviewQuery(reviewId);

  const currentReviewData = useAppSelector(
    (state) => state.reviews.newReviews
  )[0];

  useEffect(() => {
    console.log(reviewLoading);
    if (!reviewLoading) {
      console.log("currentReview", currentReview);

      dispatch(reviewsActions.clearReviews());
      dispatch(
        reviewsActions.addToLoaddedReviews({ newReviews: [currentReview] })
      );
    }
  }, [reviewLoading]);

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
  const stateLikePhoneReply = (id) =>
    dispatch(commentsListActions.setIsLiked({ id: id, isLiked: true }));

  const stateUnLikePhoneReply = (id) =>
    dispatch(commentsListActions.setIsLiked({ id: id, isLiked: false }));

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

  const addToLoadedComments = () =>
    dispatch(
      commentsListActions.addToLoaddedComments({
        newComments: data,
      })
    );

  const addOneCommentToLoadedComments = (comment, index) => {
    dispatch(
      commentsListActions.addNewCommentLocally({
        newComment: comment,
      })
    );
    // clear 0 cache
    cache.clearAll();
  };
  const addOneReplyToLoadedComments = (comment) => {
    dispatch(
      commentsListActions.addNewReplyLocally({
        newComment: comment,
      })
    );
    // clear 0 cache
    cache.clearAll();
  };

  const increasePage = () => setPage(page + 1);

  const submitCommentHandler = async (e) => {
    e.preventDefault();

    try {
      // scroll to top
      window.scrollTo(0, 0);

      setAddCommentLoading(true);

      const response = await addCommentOnPhoneReview({
        reviewId: reviewId,
        comment: e.target.comment.value,
      });

      setAddCommentLoading(false);

      // add comment to store
      const comment = {
        _id: response.data.comment,
        userId: currentUser.uid,
        userName: currentUser.name,
        userPicture: currentUser.photo,
        content: e.target.comment.value,
        createdAt: new Date(),
        likes: 0,
        liked: false,
      };

      addOneCommentToLoadedComments(comment);
    } catch (e) {
      setAddCommentLoading(false);
      setAddCommentError(e);
      console.log(e);
    }
  };

  const submitReplyHandler = async (e, commentId) => {
    e.preventDefault();

    try {
      const response = await addReplyOnPhoneReview({
        commentId: commentId,
        reply: e.target.comment.value,
      });

      // add reply to store
      const reply = {
        _id: response.data.reply,
        userId: currentUser.uid,
        userName: currentUser.name,
        userPicture: currentUser.photo,
        content: e.target.comment.value,
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
    dispatch(reviewsActions.increaseShareCounter({ id: id }));

  const reviewCard = () => {
    return (
      <div>
        {reviewLoading ? (
          <div>Loading review...</div>
        ) : reviewError ? (
          <div>Error</div>
        ) : (
          currentReviewData && (
            <CompanyReview
              key={currentReviewData._id}
              reviewDetails={currentReviewData}
              index={0}
              clearIndexCache={clearCache}
              fullScreen={true}
              isExpanded={true}
              targetProfilePath={`/${ROUTES_NAMES.COMPANY_PROFILE}?cid=${currentReviewData.targetId}`}
              userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${currentReviewData.userId}`}
              stateLikeFn={stateLikePhoneReview}
              stateUnLikeFn={stateUnLikePhoneReview}
              stateShare={stateIncreaseShareCounter}
              showActionBtn={currentUser.uid !== currentReviewData._id}
              deleteReviewFromStore={deleteReviewFromStore}
            />
          )
        )}
      </div>
    );
  };

  return (
    <FixedGrid>
      <AlonePostsGrid>
        <Box>
          {reviewLoading ? (
            <div>Loading review...</div>
          ) : reviewError ? (
            <div>Error</div>
          ) : (
            <CommentsList
              reviewCard={reviewCard}
              commentsList={commentsList}
              page={page}
              data={data}
              error={error}
              isLoading={isLoading}
              isFetching={isFetching}
              commentLike={likeCommentRequest}
              commentUnlike={unLikeCommentRequest}
              replyLike={likeReplyRequest}
              replyUnlike={unLikeReplyRequest}
              addToReviewsList={addToLoadedComments}
              increasePage={increasePage}
              cache={cache}
              clearCache={clearCache}
              submitReplyHandler={submitReplyHandler}
            />
          )}

          <div
            style={{
              position: "fixed",
              zIndex: 1000,
              bottom: 0,
            }}
          >
            <div>
              <form onSubmit={submitCommentHandler}>
                <input id="comment" />
              </form>
            </div>
          </div>
        </Box>
      </AlonePostsGrid>
    </FixedGrid>
  );
}
