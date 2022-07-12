import { Typography } from "@mui/material";
import { Fragment, useRef } from "react";
import { Virtuoso } from "react-virtuoso";
import { Footer } from "../Components/Banners/Footer";
import LoadingReviewSkeleton from "../Components/Loaders/LoadingReviewSkeleton";
import { useAppSelector } from "../store/hooks";

export default function VirtualReviewList({
  reviewsList,
  reviewCard,
  endOfData,
  loadMore,
}) {
  const listRef = useRef(null);

  return (
    <div>
      <Virtuoso
        id="cl"
        ref={listRef}
        useWindowScroll
        context={{
          endOfData,
          noData: reviewsList.length,
        }}
        data={reviewsList}
        endReached={loadMore}
        increaseViewportBy={{ top: 2500, bottom: 2500 }}
        overscan={50}
        itemContent={(index, review) => {
          return (
            <Fragment>
              <div style={{ height: "10px" }}></div>
              {reviewCard(review)}
              <div style={{ height: "10px" }}></div>
            </Fragment>
          );
        }}
        components={{ Footer: ListFooter }}
      />
    </div>
  );
}

const ListFooter = ({ context }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  const end = context.endOfData;
  return !end ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <LoadingReviewSkeleton />
    </div>
  ) : context.noData === 0 ? (
    <Typography variant="S15W500C050505">
      {textContainer.itemsNotFound}
    </Typography>
  ) : (
    <div style={{ position: "" }}>
      <Footer fullScreen={false} />
    </div>
  );
};
