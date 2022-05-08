import { Field } from "formik";
import React from "react";
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
  return (
    <>
      <Field name={fieldName}>
        {({ field: { value }, form: { setFieldValue }, meta }) => (
          <>
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
          </>
        )}
      </Field>
    </>
  );
};
export default FormikStar;
