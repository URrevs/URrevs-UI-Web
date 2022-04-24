import { useTheme } from "@emotion/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  WindowScroller
} from "react-virtualized";
import LoadingReviewSkeleton, {
  loadingSkeletonHeight
} from "../Components/Loaders/LoadingReviewSkeleton";
import ReviewCard from "../Components/ReviewCard/ReviewCard";
import { useGetAllReviewsQuery } from "../services/reviews";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { reviewsActions } from "../store/reviewsSlice";

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

  const expand = (index) => {
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
      console.log("aaaa");
      maxIndex = 0;
      dispatch(reviewsActions.increasePage());
    }
    maxIndex = Math.max(index, maxIndex);

    return (
      <div key={key}>
        {index >= reviewsList.length ? (
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "100%" }}>
              {[...Array(2)].map((a, index) => (
                <LoadingReviewSkeleton key={index} />
              ))}
            </div>
          </div>
        ) : (
          <CellMeasurer
            cache={cache}
            parent={parent}
            columnIndex={0}
            rowIndex={index}
          >
            <div style={{ ...style, direction: theme.direction }}>
              <ReviewCard index={index} onExpand={expand} />
            </div>
          </CellMeasurer>
        )}
      </div>
    );
  };

  return (
    <Fragment>
      <div style={{ height: "calc(100vh)" }}>
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
