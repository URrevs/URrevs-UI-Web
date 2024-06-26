import { FastField } from "formik";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import StarRating from "./StarRating";

const FormikStar = ({
  fieldName,
  isVertical = true,
  starRatedColor = "orange",
  starHoverColor = "orange",
  starEmptyColor = "rgb(203, 211, 227)",
  starDimension = "35px",
  starSpacing = "5px",
}) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  return (
    <>
      <FastField name={fieldName}>
        {({ field: { value }, form: { setFieldValue }, meta }) => (
          <>
            <div style={{ textAlign: "center" }}>
              <StarRating
                starSize="30px"
                textSize="S14W500C050505"
                starDimension={starDimension}
                starValue={parseInt(value)}
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
                    lineHeight: 1,
                    padding: 0,
                    margin: 0,
                    // marginTop: "3px",
                    // marginRight: "14px",
                    // marginBottom: 0,
                    // marginLeft: "14px",
                  }}
                >
                  {textContainer.starRatingMissingField}
                </p>
              )}
            </div>
          </>
        )}
      </FastField>
    </>
  );
};
export default FormikStar;
