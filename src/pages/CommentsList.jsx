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
import ROUTES_NAMES from "../RoutesNames";
import { useAppDispatch } from "../store/hooks";
import { Comment } from "../Components/Interactions/Comment";

let maxIndex = 0;

export default function CommentsList({
  commentsList,
  page,
  data,
  error,
  isLoading,
  isFetching,
  stateLike,
  stateUnLike,
  addToReviewsList,
  increasePage,
  cache,
  clearCache,
}) {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const listRef = useRef();

  useEffect(() => {
    if (data) {
      addToReviewsList();
      if (page < 2 && !isLoading && !isFetching) {
        increasePage();
      }
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
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
      maxIndex === commentsList.length &&
      data.length !== 0
    ) {
      maxIndex = 0;
      increasePage();
    }
    maxIndex = Math.max(index, maxIndex);
    return (
      <div key={key}>
        {
          <CellMeasurer
            cache={cache}
            parent={parent}
            columnIndex={0}
            rowIndex={index}
          >
            <div
              style={{
                ...style,
                direction: theme.direction,
              }}
            >
              {index >= commentsList.length && data.length === 0 ? (
                <div>No comments</div>
              ) : index >= commentsList.length && data.length !== 0 ? (
                <div>Loading...</div>
              ) : (
                <Comment
                  date={commentsList[index].createdAt}
                  user={commentsList[index].userName}
                  likes={commentsList[index].likes}
                  text={commentsList[index].content}
                />
              )}
            </div>
          </CellMeasurer>
        }
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
                      overscanRowCount={5}
                      isScrolling={isScrolling}
                      scrollTop={scrollTop}
                      width={width}
                      height={height}
                      deferredMeasurementCache={cache}
                      rowHeight={cache.rowHeight}
                      rowCount={commentsList.length + 1}
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
