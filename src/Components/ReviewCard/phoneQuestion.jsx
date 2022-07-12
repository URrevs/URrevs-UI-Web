import { generateLink } from "../../functions/dynamicLinkGenerator";
import { useCheckSignedInWithoutModal } from "../../hooks/useCheckIsSignedInWithoutModal";
import { useCheckOwnership } from "../../hooks/useCheckOwnership";
import { useCheckSignedIn } from "../../hooks/useCheckSignedIn";
import { useShareSnackbar } from "../../hooks/useShareSnackbar";
import ROUTES_NAMES from "../../RoutesNames";
import {
  useIdontLikeThisPhoneQuestionMutation,
  useIncreaseShareCounterMutation,
  useLikePhoneQuestionMutation,
  useUnLikePhoneQuestionMutation,
  useUserPressesFullScreenPhoneQuestionMutation,
} from "../../services/phone_questions";
import { useReportPhoneQuestionMutation } from "../../services/reports";
import { useAppDispatch } from "../../store/hooks";
import { sendReportActions } from "../../store/uiSendReportSlice";
import QuestionCard from "./QuestionCard";

export default function PhoneQuestion({
  disableElevation,
  showBottomLine,
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
  showAcceptedAnswer,
  stateShare,
}) {
  const checkSignedInWithoutModal = useCheckSignedInWithoutModal();

  const [dontLikeThisRequest] = useIdontLikeThisPhoneQuestionMutation();
  const [fullScreenRequest] = useUserPressesFullScreenPhoneQuestionMutation();
  const [increaseShareCounterRequest] = useIncreaseShareCounterMutation();
  const [reportPhoneQuestion] = useReportPhoneQuestionMutation();
  const generateShareLink = generateLink({
    webPath: "phone-question",
    postId: reviewDetails._id,
    postType: "phoneQuestion",
    ownerId: reviewDetails.userId,
    linkType: "post",
  });

  const showShareSnackbar = useShareSnackbar();

  const dispatch = useAppDispatch();

  const reportFunction = () => {
    dispatch(
      sendReportActions.showSendReport({
        reportAction: async (reportContent) => {
          return reportPhoneQuestion({
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
    } catch (e) {}
  };

  const [likePhoneReview] = useLikePhoneQuestionMutation();
  const [unLikePhoneReview] = useUnLikePhoneQuestionMutation();

  const checkIsSignedIn = useCheckSignedIn();
  const checkOwnerShip = useCheckOwnership({
    ownerId: reviewDetails.userId,
    message: "لا يمكنك التصويت للسؤال الخاص بك",
  });

  const likeBtnHandler = async () => {
    if (checkIsSignedIn() && checkOwnerShip()) {
      reviewDetails.upvoted
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
      showAcceptedAnswer={showAcceptedAnswer}
      disableElevation={disableElevation}
      showBottomLine={showBottomLine}
      index={index}
      fullScreen={fullScreen}
      isExpanded={isExpanded}
      reviewDetails={reviewDetails}
      isPhoneReview={true}
      targetProfilePath={targetProfilePath}
      userProfilePath={userProfilePath}
      fullScreenRoute={`/${ROUTES_NAMES.EXACT_PHONE_QUESTION}?id=${reviewDetails._id}`}
      fullScreenFn={fullScreenHandler}
      actionBtnFunction={showActionBtn && actionBtnFunction}
      reportFunction={reportFunction}
      likeBtnHandler={likeBtnHandler}
      acceptedAnswerWidget={acceptedAnswerWidget}
      shareBtnFn={shareBtnHandler}
    />
  );
}
