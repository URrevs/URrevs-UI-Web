import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import { Box, Button, Card, styled, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { useTheme } from "@emotion/react";
import { BUTTON_BORDER_RADIUS, CARD_BORDER_RADIUS } from "../../constants";
import { detectDeviceType } from "../../functions/detectDevice";
import { useShowSnackbar } from "../../hooks/useShowSnackbar";
import { useVerifyOwnedPhoneMutation } from "../../services/phones";
import { useAppDispatch } from "../../store/hooks";
import { StarLine } from "../StarLine";
import { CircularProductRate } from "./CircularProductRate";
import { OverviewCard } from "./OverviewCard";
import { postingModalActions } from "../../store/uiPostingModalSlice";
import LoadingSpinner from "../Loaders/LoadingSpinner";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import CheckIcon from "@mui/icons-material/Check";

const CardStyled = styled(
  Card,
  {}
)((theme) => ({
  borderRadius: `${CARD_BORDER_RADIUS}px`,
}));
const ButtonStyled = styled(
  Button,
  {}
)((theme) => ({
  borderRadius: `${BUTTON_BORDER_RADIUS}px`,
  padding: "6px 3px 6px 6px",
  background: "#2196F359",
}));
export const ProductOverviewCard = ({
  viewer,
  phone,
  type,
  owned = false,
  verificationRatio = 0,
  paramId = "",
  productRating,
  companyRating,
  ratings,
}) => {
  const showSnackbar = useShowSnackbar();

  const [verifyRequest, { isLoading: verifyIsLoading }] =
    useVerifyOwnedPhoneMutation();
  const verifyOwnedPhone = () => {
    if (detectDeviceType() !== "mobile") {
      dispatch(showSnackbar(textContainer.youMustVerifyFromSameMobileDevice));
    } else {
      verifyRequest({ id: paramId }).then(({ data }) => {
        if (data.verificationRatio === 0) {
          showSnackbar(textContainer.youMustVerifyFromSameMobileDevice);
        } else {
          showSnackbar(textContainer.verifiedSuccessfully);
        }
      });
    }
  };

  const textContainer = useSelector((state) => {
    return state.language.textContainer;
  });
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const renderStarReview = (text, value) => (
    <StarLine label={text} value={value} />
  );
  return (
    <React.Fragment>
      <OverviewCard viewer={viewer} title={phone} subtitle={type}>
        {verifyIsLoading ? (
          <LoadingSpinner />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "5px 0px",
            }}
          >
            <ButtonStyled
              sx={{
                filter: owned && verificationRatio !== 0 && "grayscale(1)",
              }}
              elevation="3"
              variant="contained"
              disabled={owned && verificationRatio !== 0}
              onClick={
                owned && verificationRatio === 0
                  ? () => verifyOwnedPhone()
                  : owned && verificationRatio !== 0
                  ? () => {}
                  : () => {
                      dispatch(
                        postingModalActions.showPostingModal({
                          tab: 0,
                          id: paramId,
                          type: "phone",
                          name: phone,
                        })
                      );
                    }
              }
            >
              {owned && verificationRatio === 0 ? (
                <CheckIcon
                  sx={{
                    color: theme.palette.productRateCard.addPlaylistIconColor,
                  }}
                />
              ) : owned && verificationRatio !== 0 ? (
                <PlaylistAddCheckOutlinedIcon
                  sx={{
                    color: theme.palette.productRateCard.addPlaylistIconColor,
                  }}
                />
              ) : (
                <PlaylistAddOutlinedIcon
                  sx={{
                    color: theme.palette.productRateCard.addPlaylistIconColor,
                  }}
                />
              )}
              <Typography variant="S14W400C050505">
                {owned && verificationRatio === 0
                  ? textContainer.verifyPhone
                  : owned && verificationRatio !== 0
                  ? textContainer.ownedPhone
                  : textContainer.setAsOwnedPhone}
              </Typography>
            </ButtonStyled>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "0px 3px 19px 0px",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProductRate
              barPrimaryColor={theme.palette.productRateCard.barPrimaryColor}
              barSecondaryColor={
                theme.palette.productRateCard.barSecondaryColor
              }
              value={productRating.toPrecision(2)}
            />
            <Typography variant="S14W500C050505">
              {textContainer.generalProductRating}
            </Typography>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProductRate
              barPrimaryColor={theme.palette.productRateCard.barPrimaryColor}
              barSecondaryColor={
                theme.palette.productRateCard.barSecondaryColor
              }
              value={companyRating.toPrecision(2)}
            />
            <Typography variant="S14W500C050505">
              {textContainer.generalCompanyRating}
            </Typography>
          </Box>
        </Box>
        <Box>
          {renderStarReview(textContainer.userInterface, ratings[0])}
          {renderStarReview(textContainer.manufacturingQuality, ratings[1])}
          {renderStarReview(textContainer.priceQuality, ratings[2])}
          {renderStarReview(textContainer.camera, ratings[3])}
          {renderStarReview(textContainer.callsQuality, ratings[4])}
          {renderStarReview(textContainer.battery, ratings[5])}
        </Box>
      </OverviewCard>
    </React.Fragment>
  );
};
