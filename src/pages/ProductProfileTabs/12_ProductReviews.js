import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  WindowScroller,
} from "react-virtualized";
import LoadingReviewSkeleton, {
  loadingSkeletonHeight,
} from "../../Components/Loaders/LoadingReviewSkeleton";
import { CompanyOverviewCard } from "../../Components/OverviewCard/CompanyOverviewCard";
import {
  useGetCompanyReviewsQuery,
  useGetPhoneReviewsQuery,
} from "../../services/reviews";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import CompanyReview from "../../Components/ReviewCard/CompanyReview";
import { useTheme } from "@emotion/react";
import { useSearchParams } from "react-router-dom";
import ROUTES_NAMES from "../../RoutesNames";

const cache = new CellMeasurerCache({
  fixedWidth: true,
  fixedHeight: false,
  defaultHeight: loadingSkeletonHeight,
});

let maxIndex = 0;
export const ProductReviews = ({
  viewer,
  companyRating,
  companyName,
  type,
}) => {
  const textContainer = useSelector((state) => state.language.textContainer);
  const [searchParams, setSearchParams] = useSearchParams();
  const phoneId = searchParams.get("pid");
  const [reviewsList, setReviewsList] = React.useState([]);
  const [page, setPage] = React.useState(1);

  const { data, isLoading, isFetching, error } = useGetPhoneReviewsQuery({
    round: page,
    pid: phoneId,
  });
  const theme = useTheme();
  const listRef = React.useRef();
  const [ex, setEx] = React.useState(false);

  const clearCache = (index) => {
    setEx(!ex);
    if (index === 0) {
      cache.clear(0);
    } else {
      cache.clear(index);
    }
  };

  React.useEffect(() => {
    if (data) {
      setReviewsList([...data, ...reviewsList]);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div>
        {[...Array(2)].map((a, index) => (
          <LoadingReviewSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {error.status}
        {error.code}
        {error.message}
      </div>
    );
  }

  const renderRow = ({ index, key, style, parent }) => {
    if (
      maxIndex !== 0 &&
      !isLoading &&
      !isFetching &&
      maxIndex === reviewsList.length &&
      data.length !== 0
    ) {
      maxIndex = 0;
      console.log(page);
      setPage(page + 1);
    }
    maxIndex = Math.max(index, maxIndex);
    return (
      <div key={key}>
        <CellMeasurer
          cache={cache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <div style={{ ...style, direction: theme.direction }}>
            {index >= reviewsList.length ? (
              data.length === 0 ? (
                <div>No more reviews</div>
              ) : (
                [...Array(1)].map((a, index) => (
                  <LoadingReviewSkeleton key={index} />
                ))
              )
            ) : (
              <ReviewCard
                index={index}
                clearIndexCache={clearCache}
                reviewDetails={reviewsList[index]}
                targetProfilePath={`/${ROUTES_NAMES.PHONE_PROFILE}?pid=${reviewsList[index].targetId}`}
                userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${reviewsList[index].targetId}`}
              />
            )}
          </div>
        </CellMeasurer>
      </div>
    );
  };

  return (
    //TODO VIRTUAL SCROLLING + CompanyReviewCard
    <Box sx={{ marginTop: "7px" }}>
      {/* Infinite Scroller I hope */}
      <div style={{ height: "calc(100vh)", margin: "0 0" }}>
        <AutoSizer>
          {({ height, width }) => {
            return (
              <WindowScroller>
                {({ height, isScrolling, registerChild, scrollTop }) => (
                  <div ref={registerChild}>
                    <List
                      ref={listRef}
                      autoHeight
                      overscanRowCount={10}
                      isScrolling={isScrolling}
                      scrollTop={scrollTop}
                      width={width}
                      height={height}
                      deferredMeasurementCache={cache}
                      rowHeight={cache.rowHeight}
                      rowCount={reviewsList.length + 1}
                      rowRenderer={renderRow}
                    />
                  </div>
                )}
              </WindowScroller>
            );
          }}
        </AutoSizer>
      </div>
    </Box>
  );
};
