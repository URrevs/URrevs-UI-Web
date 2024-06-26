import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import { Box, Card, Grid, styled, Typography } from "@mui/material";
import React from "react";
import { CARD_BORDER_RADIUS } from "../../constants";
import { useConvertNumberToHumanLanguage } from "../../hooks/useMillify";

const CardStyled = styled(
  Card,
  {}
)((theme) => ({
  borderRadius: `${CARD_BORDER_RADIUS}px`,
  padding: "6px 12px 19px 21px",
  marginBottom: "15px",
  margin: "0 0px",
}));
export const OverviewCard = ({
  viewer = "0",
  title = "",
  subtitle = "",
  children,
}) => {
  return (
    <React.Fragment>
      <CardStyled elevation={3}>
        <Grid container spacing={2} sx={{ padding: "0px 0px 7px 0px" }}>
          <Grid item xs={2}></Grid>
          {/* center title and subtitle */}
          <Grid
            item
            xs={8}
            sx={{
              display: "flex",
              justifyContent: "center",
              lineHeight: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                component="h1"
                variant="S18W700C050505"
                style={{ textAlign: "center" }}
              >
                {title}
              </Typography>
              <Typography component="h2" variant="S14W400C65676B">
                {subtitle}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <RemoveRedEyeRoundedIcon sx={{ margin: "0px 3px 0px 0px" }} />

              <Typography variant="S14W400C050505">
                {useConvertNumberToHumanLanguage(viewer)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        {children}
      </CardStyled>
    </React.Fragment>
  );
};
