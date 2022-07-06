import { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";

import { AlonePostsGrid } from "../../Components/Grid/AlonePostsGrid";
import { PostingComponent } from "../../Components/PostingComponents/PostingComponent";
import PhoneReview from "../../Components/ReviewCard/PhoneReview";
import ROUTES_NAMES from "../../RoutesNames";
import { useGetPhoneReviewsQuery } from "../../services/phone_reviews";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { reviewsActions } from "../../store/reviewsSlice";
import { postingModalActions } from "../../store/uiPostingModalSlice";
import VirtualReviewList from "../VirtualListWindowScroll";

export function ProductReviews() {
  const { phoneName } = useOutletContext();

  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("clear reviews");

    dispatch(reviewsActions.clearReviews());
  }, [dispatch]);

  const reviewsList = useAppSelector((state) => state.reviews.newReviews);
  const [page, setPage] = useState(1);
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const [searchParams] = useSearchParams();
  const phoneId = searchParams.get("pid");

  const { data, isLoading, isFetching, error } = useGetPhoneReviewsQuery({
    round: page,
    pid: phoneId,
  });

  const stateLike = (id) => {
    console.log(id);
    dispatch(reviewsActions.setIsLiked({ id: id, isLiked: true }));
  };

  const stateUnLike = (id) =>
    dispatch(reviewsActions.setIsLiked({ id: id, isLiked: false }));

  const addToReviewsList = () =>
    dispatch(
      reviewsActions.addToLoaddedReviews({
        newReviews: data,
      })
    );

  const increasePage = () => {
    console.log(page);
    return setPage(page + 1);
  };

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

  const reviewCard = (index, clearCache) => {
    return (
      <PhoneReview
        key={reviewsList[index]._id}
        index={index}
        fullScreen={false}
        isExpanded={false}
        clearIndexCache={clearCache}
        reviewDetails={reviewsList[index]}
        isPhoneReview={true}
        targetProfilePath={`/${ROUTES_NAMES.PHONE_PROFILE}/${ROUTES_NAMES.REVIEWS}?pid=${reviewsList[index].targetId}`}
        userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${reviewsList[index].userId}`}
        stateLikeFn={stateLike.bind(null, reviewsList[index]._id)}
        stateUnLikeFn={stateUnLike.bind(null, reviewsList[index]._id)}
        stateShare={stateIncreaseShareCounter}
        showActionBtn={true}
        deleteReviewFromStore={deleteReviewFromStore}
      />
    );
  };

  return (
    <AlonePostsGrid>
      {/* <div style={{ height: "20px" }} /> */}
      <PostingComponent
        label={textContainer.youCanAddReview}
        placeholder={textContainer.writeYourReview}
        params={{
          disabled: true,
          onClick: () => {
            dispatch(
              postingModalActions.showPostingModal({
                type: "phone",
                id: phoneId,
                name: phoneName,
                tab: 0, //AddReview Tab
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
        error={error}
        isLoading={isLoading}
        isFetching={isFetching}
        stateLike={stateLike}
        stateUnLike={stateUnLike}
        addToReviewsList={addToReviewsList}
        increasePage={increasePage}
      />
    </AlonePostsGrid>
  );
}
