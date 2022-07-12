import { Fragment, useRef } from "react";
import { Virtuoso } from "react-virtuoso";
import { Footer } from "../Components/Banners/Footer";
import LoadingReviewSkeleton from "../Components/Loaders/LoadingReviewSkeleton";

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
        }}
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
        components={{ Footer: ListFooter }}
      />
    </div>
  );
}

const ListFooter = ({ context }) => {
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
  ) : (
    <div style={{ position: "" }}>
      <Footer  fullScreen={false} />
    </div>
  );
};
