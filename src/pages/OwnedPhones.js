import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import PhoneListItem from "../Components/PhoneItemList";
import { useGetOthersOwnedPhonesQuery } from "../services/users";
import VirtualReviewList from "./VirtualListWindowScroll";

function OwnedPhonesPage() {
  const [phonesList, setphonesList] = useState([]);
  const [page, setPage] = useState(1);

  const addToPhonesList = () => setphonesList([...data, ...phonesList]);

  const increasePage = () => setPage(page + 1);

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  let { data, isLoading, isFetching, error } = useGetOthersOwnedPhonesQuery({
    round: page,
    uid: userId,
  });

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
