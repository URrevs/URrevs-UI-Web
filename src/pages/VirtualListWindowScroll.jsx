import { useTheme } from "@emotion/react";
import React, { Fragment, useRef, useState } from "react";
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
import { useAppSelector } from "../store/hooks";
import { convertDateToString } from "../functions/convertDateToString";
import { substituteDate } from "../functions/substituteDate";

const cache = new CellMeasurerCache({
  fixedWidth: true,
  fixedHeight: false,
  defaultHeight: loadingSkeletonHeight,
});

let maxIndex = 0;

export default function VirtualList({
  reviews = [],
  setRound,
  isLoading,
  error,
  round,
}) {
  const language = useAppSelector((state) => state.language.language);

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

  console.log(reviews);

  const renderRow = ({ index, key, style, parent }) => {
    return (
      <div key={key}>
        {index >= reviews.length ? (
          <CellMeasurer
            cache={cache}
            parent={parent}
            columnIndex={0}
            rowIndex={index}
          >
            <div style={{ ...style, direction: theme.direction }}>
              <div style={{ width: "100%" }}>
                {[...Array(1)].map((a, index) => (
                  <LoadingReviewSkeleton key={index} />
                ))}
              </div>
            </div>
          </CellMeasurer>
        ) : (
          <CellMeasurer
            cache={cache}
            parent={parent}
            columnIndex={0}
            rowIndex={index}
          >
            <div style={{ ...style, direction: theme.direction }}>
              <ReviewCard
                isPhoneReview={true}
                fullScreen={false}
                isExpanded={false}
                reviewDetails={reviews[index]}
                clearIndexCache={clearCache}
                index={index}
              />
            </div>
          </CellMeasurer>
        )}
      </div>
    );
  };

  return (
    <Fragment>
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
                      rowCount={reviews.length + 2}
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
