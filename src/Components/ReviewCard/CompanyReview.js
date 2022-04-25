import ReviewCard from "./ReviewCard";

const CompanyReview = ({ reviewDetails, isReview, index, clearIndexCache }) => {
  return (
    <ReviewCard
      isReview={isReview}
      reviewDetails={reviewDetails}
      index={index}
      clearIndexCache={() => {}}
      isPhoneReview={false}
      reviewIcon={true}
    />
  );
};

export default CompanyReview;
