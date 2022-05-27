import { useCheckOwnership } from "../../hooks/useCheckOwnership";
import { useCheckSignedIn } from "../../hooks/useCheckSignedIn";
import ROUTES_NAMES from "../../RoutesNames";
import {
  useIdontLikeThisCompanyQuestionMutation,
  useIncreaseShareCounterMutation,
  useLikeCompanyQuestionMutation,
  useUnLikeCompanyQuestionMutation,
  useUserPressesFullScreenCompanyQuestionMutation,
} from "../../services/company_questions";
import QuestionCard from "./QuestionCard";

export default function CompanyQuestion({
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
}) {
  const [dontLikeThisRequest] = useIdontLikeThisCompanyQuestionMutation();
  const [fullScreenRequest] = useUserPressesFullScreenCompanyQuestionMutation();

  const actionBtnFunction = async () => {
    try {
      deleteReviewFromStore(reviewDetails._id);
      await dontLikeThisRequest({ reviewId: reviewDetails._id });
    } catch (e) {
      console.log(e);
    }
  };

  const [likeCompanyReview] = useLikeCompanyQuestionMutation();
  const [unLikeCompanyReview] = useUnLikeCompanyQuestionMutation();
  const [increaseShareCounterRequest] = useIncreaseShareCounterMutation();

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
    fullScreenRequest(reviewDetails._id);
  };

  const shareBtnHandler = () => {
    increaseShareCounterRequest({ reviewId: reviewDetails._id });
  };

  return (
    <QuestionCard
      index={index}
      fullScreen={fullScreen}
      isExpanded={isExpanded}
      clearIndexCache={clearIndexCache}
      reviewDetails={reviewDetails}
      isPhoneReview={false}
      targetProfilePath={targetProfilePath}
      userProfilePath={userProfilePath}
      fullScreenRoute={`/${ROUTES_NAMES.EXACT_COMPANY_QUESTION}?id=${reviewDetails._id}`}
      fullScreenFn={fullScreenHandler}
      actionBtnFunction={showActionBtn && actionBtnFunction}
      likeBtnHandler={likeBtnHandler}
      acceptedAnswerWidget={acceptedAnswerWidget}
      shareBtnFn={shareBtnHandler}
    />
  );
}
