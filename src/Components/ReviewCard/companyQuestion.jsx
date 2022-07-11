import { generateLink } from "../../functions/dynamicLinkGenerator";
import { useCheckSignedInWithoutModal } from "../../hooks/useCheckIsSignedInWithoutModal";
import { useCheckOwnership } from "../../hooks/useCheckOwnership";
import { useCheckSignedIn } from "../../hooks/useCheckSignedIn";
import { useShareSnackbar } from "../../hooks/useShareSnackbar";
import ROUTES_NAMES from "../../RoutesNames";
import {
  useIdontLikeThisCompanyQuestionMutation,
  useIncreaseShareCounterMutation,
  useLikeCompanyQuestionMutation,
  useUnLikeCompanyQuestionMutation,
  useUserPressesFullScreenCompanyQuestionMutation,
} from "../../services/company_questions";
import { useReportCompanyQuestionMutation } from "../../services/reports";
import { useAppDispatch } from "../../store/hooks";
import { sendReportActions } from "../../store/uiSendReportSlice";
import QuestionCard from "./QuestionCard";

export default function CompanyQuestion({
  reviewDetails,
  index,
  targetProfilePath,
  userProfilePath,
  stateLikeFn,
  stateUnLikeFn,
  showActionBtn = false,
  deleteReviewFromStore,
  fullScreen,
  isExpanded,
  acceptedAnswerWidget,
  stateShare,
  disableElevation,
  showBottomLine,
}) {
  const checkSignedInWithoutModal = useCheckSignedInWithoutModal();

  const [dontLikeThisRequest] = useIdontLikeThisCompanyQuestionMutation();
  const [fullScreenRequest] = useUserPressesFullScreenCompanyQuestionMutation();

  const dispatch = useAppDispatch();

  const generateShareLink = generateLink({
    webPath: "company-question",
    postId: reviewDetails._id,
    postType: "companyQuestion",
    ownerId: reviewDetails.userId,
    linkType: "post",
  });

  const showShareSnackbar = useShareSnackbar();

  const actionBtnFunction = async () => {
    try {
      deleteReviewFromStore(reviewDetails._id);
      await dontLikeThisRequest({ reviewId: reviewDetails._id });
    } catch (e) {}
  };

  const [likeCompanyReview] = useLikeCompanyQuestionMutation();
  const [unLikeCompanyReview] = useUnLikeCompanyQuestionMutation();
  const [increaseShareCounterRequest] = useIncreaseShareCounterMutation();
  const [reportCompanyQuestion] = useReportCompanyQuestionMutation();

  const reportFunction = () => {
    dispatch(
      sendReportActions.showSendReport({
        reportAction: async (reportContent) => {
          return reportCompanyQuestion({
            reportId: reviewDetails._id,
            reportContent: reportContent,
          });
        },
      })
    );
  };

  const checkIsSignedIn = useCheckSignedIn();
  const checkOwnerShip = useCheckOwnership({
    ownerId: reviewDetails.userId,
    message: "لا يمكنك التصويت للسؤال الخاص بك",
  });

  const likeBtnHandler = async () => {
    if (checkIsSignedIn() && checkOwnerShip()) {
      reviewDetails.upvoted
        ? unLikeCompanyReview({
            reviewId: reviewDetails._id,
            doFn: stateUnLikeFn.bind(null, reviewDetails._id),
            unDoFn: stateLikeFn.bind(null, reviewDetails._id),
          })
        : likeCompanyReview({
            reviewId: reviewDetails._id,
            doFn: stateLikeFn.bind(null, reviewDetails._id),
            unDoFn: stateUnLikeFn.bind(null, reviewDetails._id),
          });
    }
  };

  const fullScreenHandler = () => {
    if (checkSignedInWithoutModal()) {
      fullScreenRequest(reviewDetails._id);
    }
  };

  const shareBtnHandler = () => {
    stateShare(reviewDetails._id);
    increaseShareCounterRequest({ reviewId: reviewDetails._id });
    generateShareLink().then((data) => {
      showShareSnackbar(data.data.shortLink, "تم نسخ رابط المنشور");
    });
  };

  return (
    <QuestionCard
      disableElevation={disableElevation}
      showBottomLine={showBottomLine}
      index={index}
      fullScreen={fullScreen}
      isExpanded={isExpanded}
      reviewDetails={reviewDetails}
      isPhoneReview={false}
      targetProfilePath={targetProfilePath}
      userProfilePath={userProfilePath}
      fullScreenRoute={`/${ROUTES_NAMES.EXACT_COMPANY_QUESTION}?id=${reviewDetails._id}`}
      fullScreenFn={fullScreenHandler}
      actionBtnFunction={showActionBtn && actionBtnFunction}
      reportFunction={reportFunction}
      likeBtnHandler={likeBtnHandler}
      acceptedAnswerWidget={acceptedAnswerWidget}
      shareBtnFn={shareBtnHandler}
    />
  );
}
