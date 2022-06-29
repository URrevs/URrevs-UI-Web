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
import QuestionCard from "./QuestionCard";

export default function PhoneQuestion({
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
  acceptedAnswerWidget,
  stateShare,
}) {
  const [dontLikeThisRequest] = useIdontLikeThisPhoneQuestionMutation();
  const [fullScreenRequest] = useUserPressesFullScreenPhoneQuestionMutation();
  const [increaseShareCounterRequest] = useIncreaseShareCounterMutation();

  const showShareSnackbar = useShareSnackbar();

  const actionBtnFunction = async () => {
    try {
      deleteReviewFromStore(reviewDetails._id);
      await dontLikeThisRequest({ reviewId: reviewDetails._id });
    } catch (e) {
      console.log(e);
    }
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
    fullScreenRequest(reviewDetails._id);
  };

  const shareBtnHandler = () => {
    stateShare(reviewDetails._id);
    increaseShareCounterRequest({ reviewId: reviewDetails._id });
    showShareSnackbar(`/phone-question?id=${reviewDetails._id}`);
  };

  return (
    <QuestionCard
      index={index}
      fullScreen={fullScreen}
      isExpanded={isExpanded}
      clearIndexCache={clearIndexCache}
      reviewDetails={reviewDetails}
      isPhoneReview={true}
      targetProfilePath={targetProfilePath}
      userProfilePath={userProfilePath}
      fullScreenRoute={`/${ROUTES_NAMES.EXACT_PHONE_QUESTION}?id=${reviewDetails._id}`}
      fullScreenFn={fullScreenHandler}
      actionBtnFunction={showActionBtn && actionBtnFunction}
      likeBtnHandler={likeBtnHandler}
      acceptedAnswerWidget={acceptedAnswerWidget}
      shareBtnFn={shareBtnHandler}
    />
  );
}
