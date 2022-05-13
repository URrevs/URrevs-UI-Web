import React, { useEffect, useState } from "react";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import {
  useGetPhoneReviewCommentsQuery,
  useAddCommentOnPhoneReviewMutation,
} from "../services/reviews";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { commentsListActions } from "../store/commentsListSlice";
import CommentsList from "./CommentsList";
import { useSearchParams } from "react-router-dom";
import ReviewCard from "../Components/ReviewCard/ReviewCard";
import ROUTES_NAMES from "../RoutesNames";
import { Box } from "@mui/material";
import { CellMeasurerCache } from "react-virtualized";
import { loadingSkeletonHeight } from "../Components/Loaders/LoadingReviewSkeleton";

const cache = new CellMeasurerCache({
  fixedWidth: true,
  fixedHeight: false,
  defaultHeight: loadingSkeletonHeight,
});

export default function InteractionWithReview() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("clear comments");

    dispatch(commentsListActions.clearComments());
  }, []);

  const currentUser = useAppSelector((state) => state.auth);

  const commentsList = useAppSelector(
    (state) => state.commentsList.newComments
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const reviewId = searchParams.get("id");

  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useGetPhoneReviewCommentsQuery(
    { reviewId, round: page }
  );

  const [addCommentLoading, setAddCommentLoading] = useState(false);
  const [addCommentError, setAddCommentError] = useState(null);
  const [addCommentOnPhoneReview] = useAddCommentOnPhoneReviewMutation();

  const [ex, setEx] = useState(false);
  const clearCache = (index) => {
    setEx(!ex);
    if (index === 0) {
      cache.clear(0);
    } else {
      cache.clear(index);
    }
  };

  // get this review from store
  const currentReview = useAppSelector(
    (state) => state.reviews.newReviews
  ).find((element) => {
    return element._id === reviewId;
  });

  const stateLike = (id) =>
    dispatch(commentsListActions.setIsLiked({ id: id, isLiked: true }));

  const stateUnLike = (id) =>
    dispatch(commentsListActions.setIsLiked({ id: id, isLiked: false }));

  const addToLoadedComments = () =>
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
        _id: response.comment,
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

    // reload after adding comment
    // dispatch(commentsListActions.clearComments());
    // setPage(1);
  };

  // const reviewCard = () => {
  //   return (
  //     <div>
  //       <ReviewCard
  //         isPhoneReview={true}
  //         fullScreen={true}
  //         isExpanded={true}
  //         reviewDetails={currentReview}
  //         clearIndexCache={() => {}}
  //         index={0}
  //         targetProfilePath={`/${ROUTES_NAMES.PHONE_PROFILE}?pid=${currentReview.targetId}`}
  //         userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${currentReview.userId}`}
  //         stateLikeFn={stateLike.bind(null, currentReview._id)}
  //         stateUnlikeFn={stateUnLike.bind(null, currentReview._id)}
  //       />
  //     </div>
  //   );
  // };

  return (
    <Box>
      <CustomAppBar showLogo showSearch showProfile />
      <CommentsList
        // reviewCard={reviewCard}
        commentsList={commentsList}
        page={page}
        data={data}
        error={error}
        isLoading={isLoading}
        isFetching={isFetching}
        stateLike={stateLike}
        stateUnLike={stateUnLike}
        addToReviewsList={addToLoadedComments}
        increasePage={increasePage}
        cache={cache}
        clearCache={clearCache}
      />
      <div
        style={{
          position: "fixed",
          zIndex: 1000,
          bottom: 0,
        }}
      >
        <form onSubmit={submitCommentHandler}>
          <input id="comment" />
        </form>
      </div>
    </Box>
  );
}
