import { useCheckOwnership } from "../../hooks/useCheckOwnership";
import { useCheckSignedIn } from "../../hooks/useCheckSignedIn";
import ROUTES_NAMES from "../../RoutesNames";
import {
  useIdontLikeThisPhoneReviewMutation,
  useLikePhoneReviewMutation,
  useUnLikePhoneReviewMutation,
  useUserPressFullScreenMutation,
  useUserPressSeeMoreMutation,
  useIncreaseViewCounterMutation,
  useIncreaseShareCounterMutation,
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
  fullScreen,
  isExpanded,
}) {
  const [dontLikeThisRequest] = useIdontLikeThisPhoneReviewMutation();
  const [fullScreenRequest] = useUserPressFullScreenMutation();
  const [seeMoreRequest] = useUserPressSeeMoreMutation();
  const [increaseViewCounterRequest] = useIncreaseViewCounterMutation();
  const [increaseShareCounterRequest] = useIncreaseShareCounterMutation();

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

  const checkIsSignedIn = useCheckSignedIn();
  const checkOwnerShip = useCheckOwnership({
    ownerId: reviewDetails.userId,
    message: "لا يمكنك الاعجاب بالمراجعة الخاصة بك",
  });

  const likeBtnHandler = async () => {
    if (checkIsSignedIn() && checkOwnerShip()) {
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
    }
  };

  const fullScreenHandler = () => {
    fullScreenRequest({ reviewId: reviewDetails._id });
  };
  const seeMoreHandler = () => {
    seeMoreRequest({ reviewId: reviewDetails._id });
    increaseViewCounterRequest({ reviewId: reviewDetails._id });
  };

  const shareBtnHandler = () => {
    increaseShareCounterRequest({ reviewId: reviewDetails._id });
  };

  return (
    <ReviewCard
      index={index}
      fullScreen={fullScreen}
      isExpanded={isExpanded}
      clearIndexCache={clearIndexCache}
      reviewDetails={reviewDetails}
      isPhoneReview={true}
      targetProfilePath={targetProfilePath}
      userProfilePath={userProfilePath}
      fullScreenRoute={`/${ROUTES_NAMES.EXACT_PHONE_REVIEW}?id=${reviewDetails._id}`}
      fullScreenFn={fullScreenHandler}
      seeMoreFn={seeMoreHandler}
      actionBtnFunction={showActionBtn && actionBtnFunction}
      likeBtnHandler={likeBtnHandler}
      shareBtnFn={shareBtnHandler}
    />
  );
}
