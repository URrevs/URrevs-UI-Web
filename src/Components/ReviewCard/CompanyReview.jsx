import { generateLink } from "../../functions/dynamicLinkGenerator";
import { useCheckOwnership } from "../../hooks/useCheckOwnership";
import { useCheckSignedIn } from "../../hooks/useCheckSignedIn";
import { useShareSnackbar } from "../../hooks/useShareSnackbar";
import { useAppDispatch } from "../../store/hooks";

import ROUTES_NAMES from "../../RoutesNames";
import {
  useIdontLikeThisCompanyReviewMutation,
  useIncreaseShareCounterMutation,
  useIncreaseViewCounterMutation,
  useLikeCompanyReviewMutation,
  useUnLikeCompanyReviewMutation,
  useUserPressFullScreenMutation,
  useUserPressSeeMoreMutation,
} from "../../services/company_reviews";
import ReviewCard from "./ReviewCard";
import { sendReportActions } from "../../store/uiSendReportSlice";
import { useReportCompanyReviewMutation } from "../../services/reports";

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
  disableElevation = false,
}) => {
  const [dontLikeThisRequest] = useIdontLikeThisCompanyReviewMutation();
  const [fullScreenRequest] = useUserPressFullScreenMutation();
  const [seeMoreRequest] = useUserPressSeeMoreMutation();
  const [increaseViewCounterRequest] = useIncreaseViewCounterMutation();
  const [increaseShareCounterRequest] = useIncreaseShareCounterMutation();
  const [reportCompanyReview] = useReportCompanyReviewMutation();

  const dispatch = useAppDispatch();

  const generateShareLink = generateLink({
    webPath: "company-review",
    postId: reviewDetails._id,
    postType: "companyReview",
    ownerId: reviewDetails.userId,
    linkType: "post",
  });

  const checkIsSignedIn = useCheckSignedIn();
  const checkOwnerShip = useCheckOwnership({
    ownerId: reviewDetails.userId,
    message: "لا يمكنك الاعجاب بالمراجعة الخاصة بك",
  });

  const showShareSnackbar = useShareSnackbar();

  const reportFunction = () => {
    dispatch(
      sendReportActions.showSendReport({
        reportAction: async (reportContent) => {
          return reportCompanyReview({
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

    generateShareLink().then((data) => {
      showShareSnackbar(data.data.shortLink);
    });
  };

  return (
    <ReviewCard
      disableElevation={disableElevation}
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
      reportFunction={reportFunction}
      likeBtnHandler={likeBtnHandler}
      fullScreenFn={fullScreenHandler}
      seeMoreFn={seeMoreHandler}
      shareBtnFn={shareBtnHandler}
    />
  );
};

export default CompanyReview;
