import React from "react";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { useGetReviewQuery } from "../services/reviews";
import ReviewCard from "../Components/ReviewCard/ReviewCard";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { substituteDate } from "../functions/substituteDate";
import { convertDateToString } from "../functions/convertDateToString";
import { Box } from "@mui/material";

export default function InteractionWithReview() {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const language = useAppSelector((state) => state.language.language);

  const [searchParams, setSearchParams] = useSearchParams();
  const reviewId = searchParams.get("id");

  const { data, error, isLoading } = useGetReviewQuery(reviewId);

  const currentUser = useAppSelector((state) => state.auth);

  return (
    <CustomAppBar showBackBtn={true} showSearch showProfile>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Box style={{ margin: "0 12px" }}>
          <ReviewCard
            isPhoneReview={true}
            fullScreen={true}
            isExpanded={true}
            reviewDetails={data}
            clearIndexCache={() => {}}
            index={0}
          />
        </Box>
      )}
    </CustomAppBar>
  );
}
