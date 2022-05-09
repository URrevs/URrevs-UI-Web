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
import {
  useGetUserCompanyReviewsQuery,
  useGetOtherUserCompanyReviewsQuery,
} from "../services/reviews";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { reviewsActions } from "../store/reviewsSlice";
import { FilterTabbar } from "../Components/Tabbar/FilterTabbar";
import { useSearchParams } from "react-router-dom";
import CompanyReview from "../Components/ReviewCard/CompanyReview";

// TODO: this may be component with 5_PostedReviews.jsx

const cache = new CellMeasurerCache({
  fixedWidth: true,
  fixedHeight: false,
  defaultHeight: loadingSkeletonHeight,
});

let maxIndex = 0;

function PostedCompanyReviews() {
  const [reviewsList, setReviewsList] = useState([]);
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const currentUser = useAppSelector((state) => state.auth);

  // let queryResult = useGetUserCompanyReviewsQuery(page, {
  //   skip: userId !== currentUser.uid,
  // });

  let queryResult = useGetOtherUserCompanyReviewsQuery(
    { round: page, uid: userId }
    // { skip: userId === currentUser.uid }
  );

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
    if (queryResult.data) {
      setReviewsList([...queryResult.data, ...reviewsList]);
    }
  }, [queryResult.data]);

  if (queryResult.isLoading) {
    return (
      <div>
        {[...Array(2)].map((a, index) => (
          <LoadingReviewSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (queryResult.error) {
    return (
      <div>
        {queryResult.error.status}
        {queryResult.error.code}
        {queryResult.error.message}
      </div>
    );
  }

  const renderRow = ({ index, key, style, parent }) => {
    if (
      maxIndex !== 0 &&
      !queryResult.isLoading &&
      !queryResult.isFetching &&
      maxIndex === reviewsList.length &&
      queryResult.data.length !== 0
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
              queryResult.data.length === 0 ? (
                <div>No more reviews</div>
              ) : (
                [...Array(1)].map((a, index) => (
                  <LoadingReviewSkeleton key={index} />
                ))
              )
            ) : (
              <CompanyReview
                index={index}
                clearIndexCache={clearCache}
                reviewDetails={reviewsList[index]}
              />
            )}
          </div>
        </CellMeasurer>
      </div>
    );
  };

  return (
    <CustomAppBar
      showLabel
      label="مراجعاتي"
      showBackBtn
      tabBar={<FilterTabbar />}
    >
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
    </CustomAppBar>
  );
}

export default PostedCompanyReviews;
