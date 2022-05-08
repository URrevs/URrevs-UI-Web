import {
  Rating,
  Typography,
  Box,
  ThemeProvider,
  createMuiTheme,
  CssBaseline,
} from "@mui/material";
import React from "react";
import { RoundedStar, RoundedOutlinedStar } from "../Icons/star";
import { RTLProvider } from "../RTLProvider";
import { GlobalStyles } from "../GlobalStyles";
import { useTheme } from "@emotion/react";

const StarRating = ({
  starValue,
  onRatingChange = () => {},
  isVertical = true,
  starDimension = "19px",
  readOnly,
}) => {
  const globalTheme = useTheme();
  const theme = createMuiTheme({ direction: globalTheme.direction });

  return (
    <>
      <GlobalStyles />
      <CssBaseline />
      <RTLProvider>
        <ThemeProvider theme={theme}>
          <Rating
            readOnly={readOnly}
            value={starValue}
            emptyIcon={
              readOnly ? (
                <RoundedStar
                  color={globalTheme.palette.reviewCard.emptyStarColor}
                />
              ) : (
                <RoundedOutlinedStar
                  color={globalTheme.palette.reviewCard.outlinedStarColor}
                />
              )
            }
            icon={
              <RoundedStar
                color={globalTheme.palette.reviewCard.filledStarColor}
              />
            }
            onChange={
              readOnly
                ? null
                : (event) => {
                    onRatingChange(event.target.value);
                  }
            }
          />
        </ThemeProvider>
      </RTLProvider>
    </>
  );
};
export default StarRating;
