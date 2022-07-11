import { useTheme } from "@emotion/react";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import { Paper, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import PhoneListItem from "../Components/PhoneItemList";
import { PAPER_BORDER_RADIUS_DESKTOP } from "../constants";
import { detectDeviceType } from "../functions/detectDevice";
import { useShowSnackbar } from "../hooks/useShowSnackbar";
import { useVerifyOwnedPhoneMutation } from "../services/phones";
import { useGetOthersOwnedPhonesQuery } from "../services/users";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import VirtualReviewList from "./VirtualListWindowScroll";

function OwnedPhonesPage() {
  const dispatch = useAppDispatch();
  const [phonesList, setphonesList] = useState([]);
  const [page, setPage] = useState(1);

  const theme = useTheme();
  const textContainer = useAppSelector((state) => state.language.textContainer);

  const addToPhonesList = () => setphonesList([...data, ...phonesList]);

  const increasePage = () => setPage(page + 1);

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  let { data, isLoading, isFetching, error } = useGetOthersOwnedPhonesQuery({
    round: page,
    uid: userId,
  });

  const showSnackbar = useShowSnackbar();

  const [verifyRequest] = useVerifyOwnedPhoneMutation();
  const verifyOwnedPhone = (id) => {
    if (detectDeviceType() !== "mobile") {
      showSnackbar(textContainer.youMustVerifyFromSameMobileDevice);
    } else {
      verifyRequest({ id }).then(({ data }) => {
        console.log(0);
        const i = phonesList.findIndex((e) => e._id === id);

        phonesList[i] = {
          ...phonesList[i],
          verificationRatio: data.verificationRatio,
        };
        setphonesList([...phonesList]);

        if (data.verificationRatio === 0) {
          showSnackbar(textContainer.youMustVerifyFromSameMobileDevice);
        } else {
          showSnackbar(textContainer.verifiedSuccessfully);
        }
      });
    }
  };

  let verificationRatioText = "";
  const getVerificationText = (ratio) => {
    if (!isLoading && !error) {
      if (ratio === 0) {
        verificationRatioText = "";
      } else if (ratio === -1) {
        verificationRatioText = textContainer.thisReviewIsFromAnApplePhone;
      } else {
        verificationRatioText =
          textContainer.thisReviewIsVerifiedBy + " " + ratio + "%";
      }
    }
    return verificationRatioText;
  };

  const verifiedTooltip = (ratio) => {
    const text = getVerificationText(ratio);
    return text !== "" ? (
      <Tooltip title={text}>
        <CheckCircleSharpIcon
          style={{
            fontSize: "16",
            verticalAlign: "middle",
            margin: "0 2px",
            marginTop: "-2px",
            color: theme.palette.reviewCard.actionBtnIconHighlight,
          }}
        />
      </Tooltip>
    ) : (
      <div></div>
    );
  };

  const renderProductOnDesktop = (phone) => (
    <div>
      <Paper
        // elevation={3}
        sx={{
          margin: "0px 3px",
          borderRadius: `${PAPER_BORDER_RADIUS_DESKTOP}px`,
          boxShadow: 3,
          // "&:hover": {
          //   backgroundColor: theme.palette.hover,
          // },
        }}
      >
        <PhoneListItem
          id={phone._id}
          title={phone.name}
          verificationIcon={verifiedTooltip}
          verificationRatio={phone.verificationRatio}
          verifyPhone={verifyOwnedPhone}
        />
      </Paper>
      <div
        style={{
          height: "20px",
        }}
      ></div>
    </div>
  );

  const phoneTile = (phone) => {
    return !theme.isMobile ? (
      renderProductOnDesktop(phone)
    ) : (
      <PhoneListItem
        id={phone._id}
        title={phone.name}
        verificationIcon={verifiedTooltip}
        verificationRatio={phone.verificationRatio}
        verifyPhone={verifyOwnedPhone}
      />
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
    <CustomAppBar showLabel label={textContainer.ownedProducts} showBackBtn>
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
