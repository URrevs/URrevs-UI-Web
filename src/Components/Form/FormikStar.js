import { Box, Typography } from "@mui/material";
import { Field } from "formik";
import React from "react";
import StarRating from "./StarRating";

const FormikStar = ({
  text,
  fieldName,
  textSize = "h6",
  isVertical = true,
  starRatedColor = "orange",
  starHoverColor = "orange",
  starEmptyColor = "rgb(203, 211, 227)",
  starDimension = "35px",
  starSpacing = "5px",
}) => {
  return (
    <>
      <Field name={fieldName}>
        {({ field: { value }, form: { setFieldValue }, meta }) => (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: isVertical ? "center" : "",
                flexDirection: isVertical ? "column" : "row",
                justifyContent: isVertical ? "" : "space-between",
              }}
            >
              <Typography
                variant={textSize}
                sx={{ pb: "5px", textAlign: isVertical ? "center" : "" }}
              >
                {text}
              </Typography>

              <div>
                <StarRating
                  textSize="S14W500C050505"
                  starDimension={starDimension}
                  starValue={value}
                  onRatingChange={(rating) => {
                    setFieldValue(fieldName, rating);
                    sessionStorage.setItem(fieldName, rating);
                  }}
                />
                {meta.touched && meta.error && (
                  <p
                    style={{
                      color: "#d32f2f",
                      fontFamily: "Tajawal",
                      fontWeight: 400,
                      fontSize: "0.75rem",
                      lineHeight: 1.66,
                      textAlign: isVertical ? "center" : "left",
                      marginTop: "3px",
                      marginRight: "14px",
                      marginBottom: 0,
                      marginLeft: "14px",
                    }}
                  >
                    {meta.error}
                  </p>
                )}
              </div>
            </Box>
          </>
        )}
      </Field>
    </>
  );
};
export default FormikStar;
