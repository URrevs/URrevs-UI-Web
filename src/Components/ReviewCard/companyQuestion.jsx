import { useCheckOwnership } from "../../hooks/useCheckOwnership";
import { useCheckSignedIn } from "../../hooks/useCheckSignedIn";
import ROUTES_NAMES from "../../RoutesNames";
import {
  useIdontLikeThisPhoneQuestionMutation,
  useLikePhoneQuestionMutation,
  useUnLikePhoneQuestionMutation,
} from "../../services/phone_questions";
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
}) {
  const [dontLikeThisRequest] = useIdontLikeThisPhoneQuestionMutation();

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
    message: "لا يمكنك التصويت للسؤال الخاصة بك",
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
      fullScreenRoute={`/${ROUTES_NAMES.EXACT_PHONE_QUESTION}?id=${reviewDetails._id}`}
      actionBtnFunction={showActionBtn && actionBtnFunction}
      likeBtnHandler={likeBtnHandler}
    />
  );
}
