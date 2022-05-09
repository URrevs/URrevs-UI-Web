import { useTheme } from "@emotion/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
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
import ReviewCard from "../Components/ReviewCard/ReviewCard";
import { useGetAllReviewsQuery } from "../services/reviews";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { reviewsActions } from "../store/reviewsSlice";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ROUTES_NAMES from "../RoutesNames";

const cache = new CellMeasurerCache({
  fixedWidth: true,
  fixedHeight: false,
  defaultHeight: loadingSkeletonHeight,
});

let maxIndex = 0;

function Reviews() {
  const dispatch = useAppDispatch();
  const reviewsList = useAppSelector((state) => state.reviews.newReviews);
  const page = useAppSelector((state) => state.reviews.page);
  const currentIndex = useAppSelector((state) => state.reviews.currentIndex);
  const { data, isLoading, isFetching, error } = useGetAllReviewsQuery(page);
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
    const scrollIndex = currentIndex === 0 ? 0 : currentIndex + 64;

    setTimeout(() => window.scrollTo(0, scrollIndex), 500);
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(
        reviewsActions.addToLoaddedReviews({
          newReviews: data,
        })
      );
      if (page < 2 && !isLoading && !isFetching) {
        dispatch(reviewsActions.increasePage());
      }
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
      page >= 2 &&
      !isLoading &&
      !isFetching &&
      maxIndex === reviewsList.length
    ) {
      maxIndex = 0;
      dispatch(reviewsActions.increasePage());
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
              [...Array(1)].map((a, index) => (
                <LoadingReviewSkeleton key={index} />
              ))
            ) : (
              <ReviewCard
                index={index}
                fullScreen={false}
                isExpanded={false}
                clearIndexCache={clearCache}
                reviewDetails={reviewsList[index]}
                isPhoneReview={true}
                targetProfilePath={`/${ROUTES_NAMES.PHONE_PROFILE}?pid=${reviewsList[index].targetId}`}
                userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${reviewsList[index].userId}`}
              />
            )}
          </div>
        </CellMeasurer>
      </div>
    );
  };

  return (
    <Fragment>
      <CustomAppBar showLogo showSearch showProfile />
      <div style={{ height: "calc(100vh)", margin: "0" }}>
        <AutoSizer>
          {({ height, width }) => {
            return (
              <WindowScroller>
                {({ height, isScrolling, registerChild, scrollTop }) => (
                  <div ref={registerChild}>
                    <List
                      ref={listRef}
                      autoHeight
                      onScroll={(scrollData) => {
                        // save current scroll position
                        dispatch(
                          reviewsActions.setIndex({
                            currentIndex: scrollData.scrollTop,
                          })
                        );
                      }}
                      overscanRowCount={10}
                      isScrolling={isScrolling}
                      scrollTop={scrollTop}
                      width={width}
                      height={height}
                      deferredMeasurementCache={cache}
                      rowHeight={cache.rowHeight}
                      rowCount={reviewsList.length + 2}
                      rowRenderer={renderRow}
                    />
                  </div>
                )}
              </WindowScroller>
            );
          }}
        </AutoSizer>
      </div>
    </Fragment>
  );
}

export default Reviews;
