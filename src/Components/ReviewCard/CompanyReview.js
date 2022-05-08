import { useAppSelector } from "../../store/hooks";
import ReviewCard from "./ReviewCard";

const CompanyReview = ({ reviewDetails, isReview, index, clearIndexCache }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  return (
    <ReviewCard
      isReview={isReview}
      reviewDetails={reviewDetails}
      index={index}
      clearIndexCache={() => {}}
      isPhoneReview={false}
      reviewIcon={true}
      firstStarTitle={textContainer.companyRating}
    />
  );
};

export default CompanyReview;
