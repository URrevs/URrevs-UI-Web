import {
  Rating,
  Typography,
  Box,
  ThemeProvider,
  createMuiTheme,
  CssBaseline,
} from "@mui/material";
import React from "react";
import Star from "../Icons/star";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { RTLProvider } from "../RTLProvider";
import { GlobalStyles } from "../GlobalStyles";
import { useTheme } from "@emotion/react";

const StarRating = ({
  text,
  textSize = "S14W500C050505",
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
      <Box
        sx={{
          display: isVertical ? "block" : "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant={textSize}>{text}</Typography>
        </Box>
        <GlobalStyles />
        <CssBaseline />
        <RTLProvider>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Rating
                readOnly={readOnly}
                value={starValue}
                emptyIcon={
                 <Star
                    color={globalTheme.palette.reviewCard.emptyStarColor}
                  />
                }
                icon={
                  <Star
                    color={globalTheme.palette.reviewCard.filledStarColor}
                  />
                }
                onChange={
                  readOnly
                    ? null
                    : (rating) => {
                        onRatingChange(rating);
                      }
                }
              />
            </Box>
          </ThemeProvider>
        </RTLProvider>
      </Box>
    </>
  );
};
export default StarRating;
