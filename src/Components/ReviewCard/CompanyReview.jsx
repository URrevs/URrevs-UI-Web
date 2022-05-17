import ROUTES_NAMES from "../../RoutesNames";
import {
  useIdontLikeThisCompanyReviewMutation,
  useLikeCompanyReviewMutation,
  useUnLikeCompanyReviewMutation,
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
}) => {
  const [dontLikeThisRequest] = useIdontLikeThisCompanyReviewMutation();

  console.log(reviewDetails);
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
    />
  );
};

export default CompanyReview;
