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
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ReviewCard from "../Components/ReviewCard/ReviewCard";
import ROUTES_NAMES from "../RoutesNames";
import { useGetAllReviewsQuery } from "../services/reviews";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import reviewsSlice, { reviewsActions } from "../store/reviewsSlice";

const cache = new CellMeasurerCache({
  fixedWidth: true,
  fixedHeight: false,
  defaultHeight: loadingSkeletonHeight,
});

let maxIndex = 0;

export default function VirtualReviewList({
  reviewsList,
  page,
  data,
  error,
  isLoading,
  isFetching,
  stateLike,
  stateUnLike,
  addToReviewsList,
  increasePage,
}) {
  const dispatch = useAppDispatch();
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
      addToReviewsList();
      if (page < 2 && !isLoading && !isFetching) {
        increasePage();
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
      maxIndex === reviewsList.length &&
      data.length !== 0
    ) {
      maxIndex = 0;
      increasePage();
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
                isPhoneReview={true}
                targetProfilePath={`/${ROUTES_NAMES.PHONE_PROFILE}?pid=${reviewsList[index].targetId}`}
                userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${reviewsList[index].userId}`}
                stateLikeFn={stateLike.bind(null, reviewsList[index]._id)}
                stateUnlikeFn={stateUnLike.bind(null, reviewsList[index]._id)}
              />
            )}
          </div>
        </CellMeasurer>
      </div>
    );
  };

  return (
    <Fragment>
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
    </Fragment>
  );
}
