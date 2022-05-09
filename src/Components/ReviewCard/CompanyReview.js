import { useAppSelector } from "../../store/hooks";
import ReviewCard from "./ReviewCard";

const CompanyReview = ({ reviewDetails, index, clearIndexCache }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  return (
    <ReviewCard
      index={index}
      fullScreen={false}
      isExpanded={false}
      clearIndexCache={clearIndexCache}
      reviewDetails={reviewDetails}
      isPhoneReview={false}
    />
  );
};

export default CompanyReview;
