import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CellMeasurerCache } from "react-virtualized";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import PhoneListItem from "../Components/PhoneItemList";
import { useGetOthersOwnedPhonesQuery } from "../services/users";
import VirtualReviewList from "./VirtualListWindowScroll";

const cache = new CellMeasurerCache({
  fixedWidth: true,
  fixedHeight: false,
  defaultHeight: 15,
});

let maxIndex = 0;

function OwnedPhonesPage({ query }) {
  const [phonesList, setphonesList] = useState([]);
  const [page, setPage] = useState(1);

  const addToPhonesList = () => setphonesList([...data, ...phonesList]);

  const increasePage = () => setPage(page + 1);

  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  let { data, isLoading, isFetching, error } = useGetOthersOwnedPhonesQuery({
    round: page,
    uid: userId,
  });

  const [ex, setEx] = useState(false);

  const clearCache = (index) => {
    setEx(!ex);
    if (index === 0) {
      cache.clear(0);
    } else {
      cache.clear(index);
    }
  };

  const phoneTile = (index) => {
    return (
      <PhoneListItem
        id={phonesList[index]._id}
        title={phonesList[index].name}
      />
    );
  };

  return (
    <CustomAppBar showLabel label="المنتجات الممتلكة" showBackBtn>
      <FixedGrid>
        <VirtualReviewList
          reviewCard={phoneTile}
          reviewsList={phonesList}
          page={page}
          data={data}
          isFetching={isFetching}
          error={error}
          isLoading={isLoading}
          addToReviewsList={addToPhonesList}
          increasePage={increasePage}
        />
      </FixedGrid>
    </CustomAppBar>
  );
}

export default OwnedPhonesPage;
