import {
  Rating,
  Typography,
  Box,
  ThemeProvider,
  CssBaseline,
  createTheme,
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
  starSize = "",
}) => {
  const globalTheme = useTheme();
  const theme = createTheme({ direction: globalTheme.direction });

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
                  size={starSize}
                  color={globalTheme.palette.reviewCard.emptyStarColor}
                />
              ) : (
                <RoundedOutlinedStar
                  size={starSize}
                  color={globalTheme.palette.reviewCard.outlinedStarColor}
                />
              )
            }
            icon={
              <RoundedStar
                size={starSize}
                color={globalTheme.palette.reviewCard.filledStarColor}
              />
            }
            onChange={
              readOnly
                ? null
                : (event) => {
                    onRatingChange(parseInt(event.target.value));
                  }
            }
          />
        </ThemeProvider>
      </RTLProvider>
    </>
  );
};
export default StarRating;
