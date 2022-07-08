import { useTheme } from "@emotion/react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CompanyOverviewCard } from "../../Components/OverviewCard/CompanyOverviewCard";
import CompanyReview from "../../Components/ReviewCard/CompanyReview";
import ROUTES_NAMES from "../../RoutesNames";
import { useGetCompanyStatsInfoQuery } from "../../services/companies";
import { useGetCompanyReviewsQuery } from "../../services/company_reviews";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { reviewsActions } from "../../store/reviewsSlice";
import VirtualReviewList from "../VirtualListWindowScroll";

export function CompanyReviews({ viewer, companyRating, companyName, type }) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  let reviewsList = useAppSelector((state) => state.reviews.newReviews);
  const [page, setPage] = useState(1);
  const textContainer = useAppSelector((state) => state.language.textContainer);

  const [searchParams] = useSearchParams();
  const cid = searchParams.get("cid");

  useEffect(() => {
    return () => {
      console.log("clear reviews");
      setPage(1);
      dispatch(reviewsActions.clearReviews());
    };
  }, [cid]);

  const { data, isLoading, isFetching, error } = useGetCompanyReviewsQuery({
    round: page,
    cid: cid,
  });

  const {
    isLoading: companyStatsIsLoading,
    error: companyStatsError,
    data: companyStatsData,
  } = useGetCompanyStatsInfoQuery(cid);

  const stateLike = (id) =>
    dispatch(reviewsActions.setIsLiked({ id: id, isLiked: true }));

  const stateUnLike = (id) =>
    dispatch(reviewsActions.setIsLiked({ id: id, isLiked: false }));

  const addToReviewsList = () =>
    dispatch(
      reviewsActions.addToLoaddedReviews({
        newReviews: data,
      })
    );

  const increasePage = () => setPage(page + 1);

  const deleteReviewFromStore = (id) => {
    dispatch(reviewsActions.clearReviews());
    const n = reviewsList.filter((review) => review._id !== id);
    console.log(n);

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
      <CompanyReview
        key={review._id}
        fullScreen={false}
        isExpanded={false}
        reviewDetails={review}
        isPhoneReview={true}
        targetProfilePath={`/${ROUTES_NAMES.COMPANY_PROFILE}/${ROUTES_NAMES.REVIEWS}?cid=${review.targetId}`}
        userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${review.userId}`}
        stateLikeFn={stateLike.bind(null, review._id)}
        stateUnLikeFn={stateUnLike.bind(null, review._id)}
        stateShare={stateIncreaseShareCounter}
        showActionBtn={true}
        deleteReviewFromStore={deleteReviewFromStore}
      />
    );
  };

  const companyOverView = () => {
    if (companyStatsIsLoading) {
      return <div>Loading...</div>;
    } else if (companyStatsError) {
      return <div>Error</div>;
    } else {
      return (
        <div>
          <CompanyOverviewCard
            companyName={companyStatsData.name}
            type={textContainer.company}
            companyRating={companyStatsData.rating.toPrecision(2)}
            viewer={companyStatsData.views}
          />
        </div>
      );
    }
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
    <Box>
      {theme.isMobile ? (
        <Fragment>
          {companyOverView()}
          <VirtualReviewList
            endOfData={endOfData}
            loadMore={loadMore}
            reviewCard={reviewCard}
            reviewsList={reviewsList}
          />
        </Fragment>
      ) : (
        <Grid container>
          <Grid item xl={2} lg={0.5} md={0.5} sm={0} xs={0}></Grid>
          <Grid item xl={6} lg={7} md={7} sm={12} xs={12}>
            {theme.isMobile && companyOverView()}
            <div style={{ height: "5px" }}></div>

            <VirtualReviewList
              endOfData={endOfData}
              loadMore={loadMore}
              reviewCard={reviewCard}
              reviewsList={reviewsList}
            />
          </Grid>

          {!theme.isMobile && (
            <Grid
              item
              xl={4}
              lg={4.5}
              md={4.5}
              sm={0}
              xs={0}
              sx={{
                [theme.breakpoints.up("xl")]: {
                  width: "30%",
                },
                [theme.breakpoints.up("lg")]: {
                  width: "36%",
                },
                [theme.breakpoints.up("md")]: {
                  width: "35%",
                },
              }}
            >
              <Box
                sx={{
                  position: "fixed",
                  padding: "0 12px",
                  width: "inherit",
                }}
              >
                <div style={{ height: "20px" }}></div>

                {companyOverView()}
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
}
