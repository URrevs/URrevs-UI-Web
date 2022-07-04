import { generateLink } from "../../functions/dynamicLinkGenerator";
import { useCheckOwnership } from "../../hooks/useCheckOwnership";
import { useCheckSignedIn } from "../../hooks/useCheckSignedIn";
import { useShareSnackbar } from "../../hooks/useShareSnackbar";
import ROUTES_NAMES from "../../RoutesNames";
import {
  useIdontLikeThisPhoneReviewMutation,
  useIncreaseShareCounterMutation,
  useIncreaseViewCounterMutation,
  useLikePhoneReviewMutation,
  useUnLikePhoneReviewMutation,
  useUserPressFullScreenMutation,
  useUserPressSeeMoreMutation,
} from "../../services/phone_reviews";
import { useReportPhoneReviewMutation } from "../../services/reports";
import { useAppDispatch } from "../../store/hooks";
import { sendReportActions } from "../../store/uiSendReportSlice";
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
  stateShare,
}) {
  /*RTK Queries */
  const [dontLikeThisRequest] = useIdontLikeThisPhoneReviewMutation();
  const [fullScreenRequest] = useUserPressFullScreenMutation();
  const [seeMoreRequest] = useUserPressSeeMoreMutation();
  const [increaseViewCounterRequest] = useIncreaseViewCounterMutation();
  const [increaseShareCounterRequest] = useIncreaseShareCounterMutation();
  const [reportPhoneReview] = useReportPhoneReviewMutation();

  const generateShareLink = generateLink({
    webPath: "phone-review",
    postId: reviewDetails._id,
    postType: "phoneReview",
    ownerId: reviewDetails.userId,
    linkType: "post",
  });

  const showShareSnackbar = useShareSnackbar();

  const dispatch = useAppDispatch();

  const reportFunction = () => {
    dispatch(
      sendReportActions.showSendReport({
        reportAction: async (reportContent) => {
          return reportPhoneReview({
            reportId: reviewDetails._id,
            reportContent: reportContent,
          });
        },
      })
    );
  };

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
    stateShare(reviewDetails._id);
    increaseShareCounterRequest({ reviewId: reviewDetails._id });

    generateShareLink().then((data) => {
      showShareSnackbar(data.data.shortLink);
    });
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
      reportFunction={reportFunction}
      likeBtnHandler={likeBtnHandler}
      shareBtnFn={shareBtnHandler}
    />
  );
}
