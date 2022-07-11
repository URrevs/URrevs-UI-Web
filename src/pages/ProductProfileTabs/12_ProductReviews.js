import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { FaButton } from "../../Components/Buttons/FaButton";
import AddIcon from "@mui/icons-material/Add";

import { AlonePostsGrid } from "../../Components/Grid/AlonePostsGrid";
import { PostingComponent } from "../../Components/PostingComponents/PostingComponent";
import PhoneReview from "../../Components/ReviewCard/PhoneReview";
import ROUTES_NAMES from "../../RoutesNames";
import { useGetPhoneReviewsQuery } from "../../services/phone_reviews";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { reviewsActions } from "../../store/reviewsSlice";
import { postingModalActions } from "../../store/uiPostingModalSlice";
import VirtualReviewList from "../VirtualListWindowScroll";
import { useTheme } from "@emotion/react";

export function ProductReviews() {
  const { phoneName } = useOutletContext();

  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      console.log("clear reviews");
      setPage(1);
      dispatch(reviewsActions.clearReviews());
    };
  }, [dispatch]);

  const reviewsList = useAppSelector((state) => state.reviews.newReviews);
  const [page, setPage] = useState(1);
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const [searchParams] = useSearchParams();
  const phoneId = searchParams.get("pid");
  const theme = useTheme();

  const { data, isLoading, isFetching, error } = useGetPhoneReviewsQuery({
    round: page,
    pid: phoneId,
  });

  const stateLike = (id) => {
    console.log(id);
    dispatch(reviewsActions.setIsLiked({ id: id, isLiked: true }));
  };

  const stateUnLike = (id) =>
    dispatch(reviewsActions.setIsLiked({ id: id, isLiked: false }));

  const addToReviewsList = () =>
    dispatch(
      reviewsActions.addToLoaddedReviews({
        newReviews: data,
      })
    );

  const increasePage = () => {
    console.log(page);
    return setPage(page + 1);
  };

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
        stateLikeFn={stateLike.bind(null, review._id)}
        stateUnLikeFn={stateUnLike.bind(null, review._id)}
        stateShare={stateIncreaseShareCounter}
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
    <AlonePostsGrid>
      <div style={{ height: "20px" }} />
      <FaButton
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
      </FaButton>
      <PostingComponent
        label={textContainer.youCanAddReview}
        placeholder={textContainer.writeYourReview}
        params={{
          disabled: true,
          onClick: () => {
            dispatch(
              postingModalActions.showPostingModal({
                type: "phone",
                id: phoneId,
                name: phoneName,
                tab: 0, //AddReview Tab
              })
            );
          },
        }}
      />
      <div style={{ marginTop: "18px" }}></div>

      <VirtualReviewList
        endOfData={endOfData}
        loadMore={loadMore}
        reviewCard={reviewCard}
        reviewsList={reviewsList}
      />
    </AlonePostsGrid>
  );
}
