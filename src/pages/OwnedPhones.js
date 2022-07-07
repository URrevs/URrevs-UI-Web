import { useTheme } from "@emotion/react";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import PhoneListItem from "../Components/PhoneItemList";
import { PAPER_BORDER_RADIUS_DESKTOP } from "../constants";
import { useGetOthersOwnedPhonesQuery } from "../services/users";
import VirtualReviewList from "./VirtualListWindowScroll";

function OwnedPhonesPage() {
  const [phonesList, setphonesList] = useState([]);
  const [page, setPage] = useState(1);

  const theme = useTheme();

  const addToPhonesList = () => setphonesList([...data, ...phonesList]);

  const increasePage = () => setPage(page + 1);

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  let { data, isLoading, isFetching, error } = useGetOthersOwnedPhonesQuery({
    round: page,
    uid: userId,
  });

  const renderProductOnDesktop = (phone) => (
    <div>
      <Paper
        // elevation={3}
        sx={{
          margin: "0px 3px",
          borderRadius: `${PAPER_BORDER_RADIUS_DESKTOP}px`,
          boxShadow: 3,
          "&:hover": {
            backgroundColor: theme.palette.hover,
          },
        }}
      >
        <PhoneListItem id={phone._id} title={phone.name} />
      </Paper>
      <div
        style={{
          height: "20px",
        }}
      ></div>
    </div>
  );

  const phoneTile = (phone) => {
    return theme.isMobile ? (
      renderProductOnDesktop(phone)
    ) : (
      <PhoneListItem id={phone._id} title={phone.name} />
    );
  };

  useEffect(() => {
    if (data) {
      addToPhonesList(data);

      if (data.length === 0) {
        setEndOfData(true);
      }
    }
  }, [data]);

  const [endOfData, setEndOfData] = useState(false);

  // function loads additional comments
  const loadMore = () => {
    if (!endOfData && !isFetching) {
      increasePage();
    }
  };

  return (
    <CustomAppBar showLabel label="المنتجات الممتلكة" showBackBtn>
      <FixedGrid>
        <VirtualReviewList
          endOfData={endOfData}
          loadMore={loadMore}
          reviewCard={phoneTile}
          reviewsList={phonesList}
        />
      </FixedGrid>
    </CustomAppBar>
  );
}

export default OwnedPhonesPage;
