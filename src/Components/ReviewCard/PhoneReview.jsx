import ROUTES_NAMES from "../../RoutesNames";
import {
  useIdontLikeThisPhoneReviewMutation,
  useLikePhoneReviewMutation,
  useUnLikePhoneReviewMutation,
} from "../../services/phone_reviews";
import ReviewCard from "./ReviewCard";

export default function PhoneReview({
  reviewDetails,
  index,
  clearIndexCache,
  targetProfilePath,
  userProfilePath,
  stateLikeFn,
  stateUnLikeFn,
  showActionBtn = false,
  deleteReviewFromStore,
}) {
  const [dontLikeThisRequest] = useIdontLikeThisPhoneReviewMutation();

  console.log(reviewDetails);
  const actionBtnFunction = async () => {
    try {
      deleteReviewFromStore(reviewDetails._id);
      await dontLikeThisRequest({ reviewId: reviewDetails._id });
    } catch (e) {
      console.log(e);
    }
  };

  const [likePhoneReview] = useLikePhoneReviewMutation();
  const [unLikePhoneReview] = useUnLikePhoneReviewMutation();

  const likeBtnHandler = async () => {
    reviewDetails.liked
      ? unLikePhoneReview({
          reviewId: reviewDetails._id,
          doFn: stateUnLikeFn.bind(null, reviewDetails._id),
          unDoFn: stateLikeFn.bind(null, reviewDetails._id),
        })
      : likePhoneReview({
          reviewId: reviewDetails._id,
          doFn: stateLikeFn.bind(null, reviewDetails._id),
          unDoFn: stateUnLikeFn.bind(null, reviewDetails._id),
        });
  };

  return (
    <ReviewCard
      index={index}
      fullScreen={false}
      isExpanded={false}
      clearIndexCache={clearIndexCache}
      reviewDetails={reviewDetails}
      isPhoneReview={true}
      targetProfilePath={targetProfilePath}
      userProfilePath={userProfilePath}
      fullScreenRoute={`/${ROUTES_NAMES.EXACT_PHONE_REVIEW}?id=${reviewDetails._id}`}
      actionBtnFunction={showActionBtn && actionBtnFunction}
      likeBtnHandler={likeBtnHandler}
    />
  );
}
