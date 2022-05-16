import ROUTES_NAMES from "../../RoutesNames";
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
}) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  return (
    <ReviewCard
      index={index}
      fullScreen={false}
      isExpanded={false}
      clearIndexCache={clearIndexCache}
      reviewDetails={reviewDetails}
      isPhoneReview={false}
      targetProfilePath={targetProfilePath}
      userProfilePath={userProfilePath}
      stateLikeFn={stateLikeFn.bind(null, reviewDetails._id)}
      stateUnlikeFn={stateUnLikeFn.bind(null, reviewDetails._id)}
      fullScreenRoute={`/${ROUTES_NAMES.EXACT_COMPANY_REVIEW}?id=${reviewDetails._id}`}
    />
  );
};

export default CompanyReview;
