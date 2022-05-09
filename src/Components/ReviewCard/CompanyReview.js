import { useAppSelector } from "../../store/hooks";
import ReviewCard from "./ReviewCard";

const CompanyReview = ({
  reviewDetails,
  index,
  clearIndexCache,
  targetProfilePath,
  userProfilePath,
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
    />
  );
};

export default CompanyReview;
