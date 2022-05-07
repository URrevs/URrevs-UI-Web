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
            views={data.views}
            reviewDetails={{
              id: data.id,
              user_id: data.userId,
              user_name: data.userName,
              brand: data.targetName,
              rating: 1,
              pros: data.pros,
              cons: data.cons,
              ratings: {},
              brand_rating: 1,
              date_buy: substituteDate(data.ownedAt, language),
              date_rev: convertDateToString(data.createdAt, language),
              isExpanded: true,
              user_avatar: data.photo,
              likesCounter: data.likes,
              commentsCounter: data.commentsCount,
              shareCounter: data.shares,
              isLiked: data.liked,
            }}
            ratings={[
              data.generalRating,
              data.uiRating,
              data.manufacturingQuality,
              data.valueForMoney,
              data.camera,
              data.callQuality,
              data.battery,
            ]}
            clearIndexCache={() => {}}
            index={0}
          />
        </Box>
      )}
    </CustomAppBar>
  );
}
