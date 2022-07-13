import React from "react";
import { useTheme } from "@emotion/react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import OrangeGradientButton from "../Buttons/OrangeGradientButton";
import { regDialogActions } from "../../store/uiRegisterDialogSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { CARD_BORDER_RADIUS } from "../../constants";

export default function Banner() {
  const dispatch = useAppDispatch();
  const textContainer = useAppSelector((state) => state.language.textContainer);

  const theme = useTheme();
  const cardShadow = "0px 14px 80px rgba(34, 35, 58, 0.2)";
  const headerShadow = "4px 4px 20px 1px rgba(33, 203, 243, .3)";
  const pageContainer = {
    headerTitle: textContainer.landingPageHeaderTitle,
    subheaderTitle: textContainer.landingPageSubheaderTitle,
    subtitle: textContainer.landingPageSubtitle,
    primaryActionText: textContainer.landingPagePrimaryActionText,
    secondaryActionText: textContainer.landingPageSecondaryActionText,
  };

  return (
    <Card
      style={{
        borderRadius: `${CARD_BORDER_RADIUS}px`,
        transition: "0.3s", //why?
        boxShadow: cardShadow,
        position: "relative",
        overflow: "initial",
        background: "#ffffff",
        // space between header and list
        marginBottom: "12px",
        marginTop: theme.spacing(4),
        padding: theme.spacing(2, 0, 0, 0),
        [theme.breakpoints.only("xs")]: {
          marginTop: theme.spacing(6),
        },
      }}
    >
      <CardHeader
        style={{
          flexShrink: 0,
          position: "absolute",
          right: 20,
          left: 20,
          borderRadius: theme.spacing(2),
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(33, 150, 243, 0.72) 0deg, #21ADF3 151.87deg, #22CBF4 315deg, rgba(33, 150, 243, 0.72) 360deg)",
          overflow: "hidden",
          boxShadow: headerShadow,
          textAlign: "center",
          top: theme.spacing(-4),
          [theme.breakpoints.only("xs")]: {
            top: theme.spacing(-6),
          },
        }}
        title={
          <Typography
            variant="subtitle1"
            component="h1"
            style={{
              color: theme.palette.getContrastText(theme.palette.primary.main),
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            {pageContainer.headerTitle}
          </Typography>
        }
        subheader={
          <Typography
            variant="subtitle2"
            component="h1"
            style={{
              color: theme.palette.getContrastText(theme.palette.primary.main),
              opacity: 0.87,
              fontWeight: 400,
              letterSpacing: 0.4,
            }}
          >
            {pageContainer.subheaderTitle}
          </Typography>
        }
      />
      <CardContent style={{ textAlign: "center" }}>
        <div style={{ paddingTop: "38px", overflowX: "auto" }}>
          <Typography variant="subtitle1" component="h3">
            {pageContainer.subtitle}
          </Typography>
          <OrangeGradientButton
            color="red"
            onClick={() => {
              dispatch(regDialogActions.toggleRegistration());
            }}
          >
            {pageContainer.primaryActionText}
          </OrangeGradientButton>
          {pageContainer.showSecondaryAction && (
            <OrangeGradientButton color="red" onClick={() => {}}>
              {pageContainer.secondaryActionText}
            </OrangeGradientButton>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
