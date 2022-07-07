import { useTheme } from "@emotion/react";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  WindowScroller,
} from "react-virtualized";
import { Virtuoso } from "react-virtuoso";
import LoadingReviewSkeleton, {
  loadingSkeletonHeight,
} from "../Components/Loaders/LoadingReviewSkeleton";

const cache = new CellMeasurerCache({
  fixedWidth: true,
  fixedHeight: false,
  defaultHeight: loadingSkeletonHeight,
});

let maxIndex = 0;

export default function VirtualReviewList({
  reviewsList,
  reviewCard,
  endOfData,
  loadMore,
}) {
  return (
    <Fragment>
      <Virtuoso
        useWindowScroll
        context={{ endOfData }}
        data={reviewsList}
        endReached={loadMore}
        increaseViewportBy={{ top: 4000, bottom: 4000 }}
        overscan={100}
        itemContent={(index, review) => {
          return (
            <Fragment>
              <div style={{ height: "10px" }}></div>
              {reviewCard(review)}
              <div style={{ height: "10px" }}></div>
            </Fragment>
          );
        }}
        components={{ Footer }}
      />
    </Fragment>
  );
}

const Footer = ({ context }) => {
  const end = context.endOfData;
  return (
    !end && (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* <LoadingReviewSkeleton /> */}
      </div>
    )
  );
};
