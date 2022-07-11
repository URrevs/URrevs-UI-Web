import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaButton } from "../Components/Buttons/FaButton";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import AddIcon from "@mui/icons-material/Add";

import PhoneReview from "../Components/ReviewCard/PhoneReview";
import ROUTES_NAMES from "../RoutesNames";
import { useGetOtherUserPhoneReviewsQuery } from "../services/phone_reviews";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { reviewsActions } from "../store/reviewsSlice";
import VirtualReviewList from "./VirtualListWindowScroll";
import { useTheme } from "@emotion/react";
import { postingModalActions } from "../store/uiPostingModalSlice";
import { Box, Typography } from "@mui/material";

export function PostedPhoneReviews() {
  const dispatch = useAppDispatch();

  const reviewsList = useAppSelector((state) => state.reviews.newReviews);
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    return () => {
      setPage(1);
      setEndOfData(false);
      console.log("clear reviews");
      dispatch(reviewsActions.clearReviews());
    };
  }, [userId]);

  const { data, isLoading, isFetching, error } =
    useGetOtherUserPhoneReviewsQuery(
      { round: page, uid: userId },
      { refetchOnMountOrArgChange: true }
    );

  const stateLike = (id) =>
    dispatch(reviewsActions.setIsLiked({ id: id, isLiked: true }));

  const stateUnLike = (id) =>
    dispatch(reviewsActions.setIsLiked({ id: id, isLiked: false }));

  const addToReviewsList = (data) => {
    console.log(data);

    dispatch(
      reviewsActions.addToLoaddedReviews({
        newReviews: data,
      })
    );
  };

  const increasePage = () => setPage((page) => page + 1);

  const deleteReviewFromStore = (id) => {
    dispatch(reviewsActions.clearReviews());
    const n = reviewsList.filter((review) => review._id !== id);

    dispatch(
      reviewsActions.addToLoaddedReviews({
        newReviews: n,
      })
    );
  };

  const stateIncreaseShareCounter = (id) =>
    dispatch(reviewsActions.increaseShareCounter({ id: id }));

  const reviewCard = (review) => {
    return (
      <PhoneReview
        key={review._id}
        fullScreen={false}
        isExpanded={false}
        reviewDetails={review}
        isPhoneReview={true}
        targetProfilePath={`/${ROUTES_NAMES.PHONE_PROFILE}/${ROUTES_NAMES.REVIEWS}?pid=${review.targetId}`}
        userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${review.userId}`}
        stateLikeFn={stateLike}
        stateUnLikeFn={stateUnLike}
        stateShare={stateIncreaseShareCounter}
        fullScreenRoute={`/${ROUTES_NAMES.EXACT_PHONE_REVIEW}?id=${review._id}`}
        showActionBtn={true}
        deleteReviewFromStore={deleteReviewFromStore}
      />
    );
  };

  useEffect(() => {
    if (data) {
      addToReviewsList(data);

      if (data.length === 0) {
        setEndOfData(true);
      }
    }
  }, [data]);

  const [endOfData, setEndOfData] = useState(false);

  // function loads additional comments
  const loadMore = () => {
    if (!endOfData && !isFetching) {
      increasePage();
    }
  };

  return (
    <div>
      {/* <FaButton
        icon={
          <AddIcon
            sx={{
              color: theme.palette.defaultRedBtnIconColor,
              fontSize: "28px",
            }}
          />
        }
        onClick={() => {
          dispatch(
            postingModalActions.showPostingModal({
              tab: 0,
            })
          );
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="S14W700Cffffff">
            {textContainer.addReview}
          </Typography>
        </Box>
      </FaButton> */}
      <VirtualReviewList
        endOfData={endOfData}
        loadMore={loadMore}
        reviewCard={reviewCard}
        reviewsList={reviewsList}
      />
    </div>
  );
}
