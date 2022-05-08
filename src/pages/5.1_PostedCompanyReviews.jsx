import { useTheme } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  WindowScroller,
} from "react-virtualized";
import LoadingReviewSkeleton, {
  loadingSkeletonHeight,
} from "../Components/Loaders/LoadingReviewSkeleton";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ReviewCard from "../Components/ReviewCard/ReviewCard";
import { useGetUserCompanyReviewsQuery } from "../services/reviews";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { reviewsActions } from "../store/reviewsSlice";
import { FilterTabbar } from "../Components/Tabbar/FilterTabbar";

// TODO: this may be component with 5_PostedReviews.jsx

const cache = new CellMeasurerCache({
  fixedWidth: true,
  fixedHeight: false,
  defaultHeight: loadingSkeletonHeight,
});

let maxIndex = 0;

function PostedCompanyReviews({ query }) {
  const [reviewsList, setReviewsList] = useState([]);
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } =
    useGetUserCompanyReviewsQuery(page);

  const theme = useTheme();
  const listRef = useRef();
  const [ex, setEx] = useState(false);

  const clearCache = (index) => {
    setEx(!ex);
    if (index === 0) {
      cache.clear(0);
    } else {
      cache.clear(index);
    }
  };

  useEffect(() => {
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
                fullScreen={false}
                isExpanded={false}
                clearIndexCache={clearCache}
                reviewDetails={reviewsList[index]}
                isPhoneReview={false}
              />
            )}
          </div>
        </CellMeasurer>
      </div>
    );
  };

  return (
    <CustomAppBar showLabel label="مراجعاتي" showBackBtn>
      <FilterTabbar />
      <div style={{ height: "calc(100vh)", margin: "0 12px" }}>
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
    </CustomAppBar>
  );
}

export default PostedCompanyReviews;
