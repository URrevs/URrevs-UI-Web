import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import CompanyReview from "../Components/ReviewCard/CompanyReview";
import ROUTES_NAMES from "../RoutesNames";
import { useLazyGetOtherUserCompanyReviewsQuery } from "../services/company_reviews";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { reviewsActions } from "../store/reviewsSlice";
import VirtualReviewList from "./VirtualListWindowScroll";

export function PostedCompanyReviews() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      p = 1;
      dispatch(reviewsActions.clearReviews());
    };
  }, []);

  const currentUser = useAppSelector((state) => state.auth);

  const reviewsList = useAppSelector((state) => state.reviews.newReviews);

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const [getReviews, { isLoading, isFetching, error }] =
    useLazyGetOtherUserCompanyReviewsQuery();

  const stateLike = (id) =>
    dispatch(reviewsActions.setIsLiked({ id: id, isLiked: true }));

  const stateUnLike = (id) =>
    dispatch(reviewsActions.setIsLiked({ id: id, isLiked: false }));

  const addToReviewsList = (data) =>
    dispatch(
      reviewsActions.addToLoaddedReviews({
        newReviews: data,
      })
    );

  const deleteReviewFromStore = (id) => {
    dispatch(reviewsActions.clearReviews());
    const n = reviewsList.filter((review) => review._id !== id);

    dispatch(
      reviewsActions.addToLoaddedReviews({
        newReviews: n,
      })
    );
  };

  const stateIncreaseShareCounter = (id) =>
    dispatch(reviewsActions.increaseShareCounter({ id: id }));

  const reviewCard = (review) => {
    return (
      <CompanyReview
        key={review._id}
        fullScreen={false}
        isExpanded={false}
        reviewDetails={review}
        isPhoneReview={true}
        targetProfilePath={`/${ROUTES_NAMES.COMPANY_PROFILE}/${ROUTES_NAMES.REVIEWS}?cid=${review.targetId}`}
        userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${review.userId}`}
        stateLikeFn={stateLike}
        stateUnLikeFn={stateUnLike}
        stateShare={stateIncreaseShareCounter}
        showActionBtn={userId !== currentUser.uid}
        deleteReviewFromStore={deleteReviewFromStore}
      />
    );
  };

  const [endOfData, setEndOfData] = useState(false);

  // first page
  let p = 1;
  // function loads additional comments
  const loadMore = useCallback(() => {
    if (!endOfData) {
      getReviews({ round: p, uid: userId }).then((data) => {
        if (data.data.length === 0) {
          setEndOfData(true);
        } else {
          addToReviewsList(data.data);
          p++;
        }
      });
    }
  }, [p, endOfData, userId]);

  // to load for the first time
  useEffect(() => {
    const timeout = loadMore();
    return () => clearTimeout(timeout);
  }, [userId]);

  return (
    <VirtualReviewList
      endOfData={endOfData}
      loadMore={loadMore}
      reviewCard={reviewCard}
      reviewsList={reviewsList}
    />
  );
}
