import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CellMeasurerCache } from "react-virtualized";
import { Virtuoso } from "react-virtuoso";
import { AlonePostsGrid } from "../Components/Grid/AlonePostsGrid";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import { Comment } from "../Components/Interactions/Comment";
import { CommentReply } from "../Components/Interactions/CommentReply";
import { loadingSkeletonHeight } from "../Components/Loaders/LoadingReviewSkeleton";
import { PostingField } from "../Components/PostingComponents/PostingField";
import CompanyReview from "../Components/ReviewCard/CompanyReview";
import { useShowSnackbar } from "../hooks/useShowSnackbar";
import ROUTES_NAMES from "../RoutesNames";
import {
  useAddCommentOnCompanyReviewMutation,
  useAddReplyOnCompanyReviewMutation,
  useGetCertainCompanyReviewQuery,
  useLazyGetCompanyReviewCommentsQuery,
  useLikeCompanyReviewCommentMutation,
  useLikeCompanyReviewReplyMutation,
  useUnLikeCompanyReviewCommentMutation,
  useUnLikeCompanyReviewReplyMutation,
} from "../services/company_reviews";
import { commentsListActions } from "../store/commentsListSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { reviewsActions } from "../store/reviewsSlice";

const cache = new CellMeasurerCache({
  fixedWidth: true,
  fixedHeight: false,
  defaultHeight: loadingSkeletonHeight,
});

export default function CompanyReviewFullScreen() {
  const dispatch = useAppDispatch();
  const showSnackbar = useShowSnackbar();

  const isMobile = useTheme().isMobile;

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      console.log("clear comments");
      // TODO:
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

  const currentReviewData = useAppSelector(
    (state) => state.reviews.newReviews
  )[0];

  const [getComments, { isLoading, isFetching, error }] =
    useLazyGetCompanyReviewCommentsQuery();

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
    console.log("cleared", index);
    setEx(!ex);
    if (index === 0) {
      cache.clear(0);
    } else {
      cache.clear(index);
    }
  };

  const clearAllCache = () => cache.clearAll();

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

  useEffect(() => {
    if (currentReview) {
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
    // clear all comments cache
    cache.clearAll();
  };

  const addOneReplyToLoadedComments = (index, comment) => {
    dispatch(
      commentsListActions.addNewReplyLocally({
        newComment: comment,
      })
    );
    const keys = Object.keys(cache._rowHeightCache);
    keys.forEach((key, i) => {
      if (i === 0) {
      } else {
        cache.clear(i);
      }
    });
  };

  const increasePage = () => {
    setPage((page) => page + 1);
    console.log(page);
  };

  const submitCommentHandler = async (text) => {
    try {
      // scroll to top
      window.scrollTo(0, cache._rowHeightCache["0-0"]);

      setAddCommentLoading(true);

      const response = await addCommentOnPhoneReview({
        reviewId: reviewId,
        comment: text,
      });

      setAddCommentLoading(false);

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
      };

      addOneCommentToLoadedComments(comment);
    } catch (e) {
      setAddCommentLoading(false);
      showSnackbar(e.data.status);
    }
  };

  const submitReplyHandler = async (index, text, commentId) => {
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

      addOneReplyToLoadedComments(index, reply);
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
    if (reviewLoading) {
      return <div>Loading review...</div>;
    } else if (reviewError) {
      return <div>Error</div>;
    } else if (currentReview) {
      return (
        <CompanyReview
          disableElevation={!isMobile}
          key={currentReviewData._id}
          reviewDetails={currentReviewData}
          index={0}
          clearIndexCache={clearCache}
          fullScreen={true}
          isExpanded={true}
          targetProfilePath={`/${ROUTES_NAMES.COMPANY_PROFILE}/${ROUTES_NAMES.REVIEWS}?cid=${currentReviewData.targetId}`}
          userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${currentReviewData.userId}`}
          stateLikeFn={stateLikePhoneReview}
          stateUnLikeFn={stateUnLikePhoneReview}
          stateShare={stateIncreaseShareCounter}
          showActionBtn={currentUser.uid !== currentReviewData._id}
          deleteReviewFromStore={deleteReviewFromStore}
        />
      );
    }
  };

  const commentField = () => {
    return (
      isMobile && (
        <div
          style={{
            position: "fixed",
            zIndex: 1000,
            bottom: 0,
            padding: "12px",
            background: "#fff",
            width: "100%",
          }}
        >
          <PostingField
            avatar={false}
            placeholder="اكتب تعليقا"
            onSubmit={(comment) => submitCommentHandler(comment)}
          />
        </div>
      )
    );
  };

  const [newList, setNewList] = useState([]);
  const [endOfData, setEndOfData] = useState(false);

  let p = 1;
  const loadMore = useCallback(() => {
    getComments({ reviewId, round: p }).then((data) => {
      if (data.data.length === 0) {
        setEndOfData(true);
      } else {
        addToLoadedComments(data.data);
        p++;
      }
    });
  }, [setNewList]);

  useEffect(() => {
    const timeout = loadMore();
    return () => clearTimeout(timeout);
  }, []);

  const desktopTheme = !isMobile
    ? {
        background: "#fff",
        padding: "0px 4px 4px 4px",
        borderRadius: "10px",
      }
    : {};

  return (
    <FixedGrid>
      <AlonePostsGrid>
        <Box>
          {reviewLoading ? (
            <div>Loading review...</div>
          ) : reviewError ? (
            <div>Error</div>
          ) : (
            currentReviewData && (
              <div style={desktopTheme}>
                {reviewCard()}
                {!isMobile && (
                  <PostingField
                    avatar={true}
                    placeholder="اكتب تعليقا"
                    onSubmit={(comment) => submitCommentHandler(comment)}
                  />
                )}
                <Virtuoso
                  useWindowScroll
                  context={{ endOfData }}
                  data={commentsList}
                  endReached={loadMore}
                  increaseViewportBy={{ top: 2500, bottom: 2500 }}
                  overscan={20}
                  itemContent={(index, comment) => {
                    return comment.isReply ? (
                      <CommentReply
                        replyId={comment._id}
                        date={comment.createdAt}
                        user={comment.userName}
                        likes={comment.likes}
                        text={comment.content}
                        liked={comment.liked}
                        replyLike={likeReplyRequest}
                        replyUnlike={unLikeReplyRequest}
                        commentId={comment.commentId}
                        avatar={comment.userPicture}
                        userId={comment.userId}
                      />
                    ) : (
                      <Comment
                        commentId={comment._id}
                        date={comment.createdAt}
                        user={comment.userName}
                        likes={comment.likes}
                        text={comment.content}
                        liked={comment.liked}
                        commentLike={likeCommentRequest}
                        commentUnlike={unLikeCommentRequest}
                        submitReplyHandler={submitReplyHandler.bind(
                          this,
                          index
                        )}
                        avatar={comment.userPicture}
                        userId={comment.userId}
                      />
                    );
                  }}
                  components={{ Footer }}
                />
              </div>
            )
          )}
        </Box>
      </AlonePostsGrid>
    </FixedGrid>
  );
}

const Footer = ({ context }) => {
  const end = context.endOfData;
  return (
    !end && (
      <div
        style={{
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    )
  );
};
