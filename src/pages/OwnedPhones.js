import { useTheme } from "@emotion/react";
import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import PhoneListItem from "../Components/PhoneItemList";
import { PAPER_BORDER_RADIUS_DESKTOP } from "../constants";
import { useGetOthersOwnedPhonesQuery } from "../services/users";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import VirtualReviewList from "./VirtualListWindowScroll";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import { MoreVertOutlined } from "@mui/icons-material";
import { detectDeviceType } from "../functions/detectDevice";
import { snackbarActions } from "../store/uiSnackbarSlice";

function OwnedPhonesPage() {
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

  /////////////////////////////////////////////
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const currentUser = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const verifyMenu = () => {
    return (
      <Stack direction="row" spacing={1}>
        <div>
          <IconButton
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            sx={{}}
          >
            <MoreVertOutlined />
          </IconButton>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper
                  sx={{
                    borderRadius: "15px",
                  }}
                >
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      sx={{ padding: "0" }}
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem
                        sx={{ padding: "10px 28px", minHeight: 0 }}
                        onClick={() => {
                          if (detectDeviceType() !== "mobile") {
                            dispatch(
                              snackbarActions.showSnackbar({
                                message:
                                  textContainer.youMustVerifyFromSameMobileDevice,
                              })
                            );
                          } else {
                            console.log("a");
                          }
                        }}
                      >
                        <Typography variant="S16W700C050505">
                          {textContainer.verify}
                        </Typography>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>
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
          actionButton={verifyMenu}
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
        actionButton={verifyMenu}
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
