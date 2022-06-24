import React from "react";
import { useTheme } from "@emotion/react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import OrangeGradientButton from "../Buttons/OrangeGradientButton";
export default function Banner() {
  const theme = useTheme();
  const cardShadow = "0px 14px 80px rgba(34, 35, 58, 0.2)";
  const headerShadow = "4px 4px 20px 1px rgba(33, 203, 243, .3)";
  const pageContainer = {
    headerTitle: "أول منصة لمراجعات المستخدمين بالشرق الأوسط",
    subheaderTitle: "اَراء مستخدمي الهواتف في مكان واحد",
    subtitle: "هدفنا مساعدتك تختار",
    primaryActionText: "راجع الاَن",
    secondaryActionText: "سجل الاَن",
  };
  return (
    <Card
      style={{
        borderRadius: theme.shape.borderRadius,
        transition: "0.3s",
        boxShadow: cardShadow,
        position: "relative",
        overflow: "initial",
        background: "#ffffff",
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
          background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.light} 90%)`,
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
          <OrangeGradientButton color="red" onClick={() => {}}>
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
