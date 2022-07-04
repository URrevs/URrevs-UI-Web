import { useCheckOwnership } from "../../hooks/useCheckOwnership";
import { useCheckSignedIn } from "../../hooks/useCheckSignedIn";
import { useShareSnackbar } from "../../hooks/useShareSnackbar";
import ROUTES_NAMES from "../../RoutesNames";
import {
  useIdontLikeThisCompanyReviewMutation,
  useLikeCompanyReviewMutation,
  useUnLikeCompanyReviewMutation,
  useUserPressFullScreenMutation,
  useUserPressSeeMoreMutation,
  useIncreaseViewCounterMutation,
  useIncreaseShareCounterMutation,
} from "../../services/company_reviews";
import { useAppSelector } from "../../store/hooks";
import ReviewCard from "./ReviewCard";

const CompanyReview = ({
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
  stateShare,
  disableElevation,
}) => {
  const [dontLikeThisRequest] = useIdontLikeThisCompanyReviewMutation();
  const [fullScreenRequest] = useUserPressFullScreenMutation();
  const [seeMoreRequest] = useUserPressSeeMoreMutation();
  const [increaseViewCounterRequest] = useIncreaseViewCounterMutation();
  const [increaseShareCounterRequest] = useIncreaseShareCounterMutation();

  const checkIsSignedIn = useCheckSignedIn();
  const checkOwnerShip = useCheckOwnership({
    ownerId: reviewDetails.userId,
    message: "لا يمكنك الاعجاب بالمراجعة الخاصة بك",
  });

  const showShareSnackbar = useShareSnackbar();

  const actionBtnFunction = async () => {
    try {
      deleteReviewFromStore(reviewDetails._id);
      await dontLikeThisRequest({ reviewId: reviewDetails._id });
    } catch (e) {
      console.log(e);
    }
  };

  const [likePhoneReview] = useLikeCompanyReviewMutation();
  const [unLikePhoneReview] = useUnLikeCompanyReviewMutation();

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
    stateShare(reviewDetails._id);
    increaseShareCounterRequest({ reviewId: reviewDetails._id });
    showShareSnackbar(`/company-review?id=${reviewDetails._id}`);
  };

  return (
    <ReviewCard
      disableElevation
      index={index}
      fullScreen={fullScreen}
      isExpanded={isExpanded}
      clearIndexCache={clearIndexCache}
      reviewDetails={reviewDetails}
      isPhoneReview={false}
      targetProfilePath={targetProfilePath}
      userProfilePath={userProfilePath}
      fullScreenRoute={`/${ROUTES_NAMES.EXACT_COMPANY_REVIEW}?id=${reviewDetails._id}`}
      actionBtnFunction={showActionBtn && actionBtnFunction}
      likeBtnHandler={likeBtnHandler}
      fullScreenFn={fullScreenHandler}
      seeMoreFn={seeMoreHandler}
      shareBtnFn={shareBtnHandler}
    />
  );
};

export default CompanyReview;
