import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { SearchBar } from "../Components/MainLayout/Search/SearchBar";
import FormikDatePicker from "../Components/Form/FormikDatePicker";
import FormikTextField from "../Components/Form/FormikTextField";
import FormikStar from "../Components/Form/FormikStar";

const BasicValidationSchema = Yup.object().shape({
  purchaseDate: Yup.date().required("Select a Date"),
  productBuildRating: Yup.number().integer().min(1, "Select Stars"),
  productUIRating: Yup.number().integer().min(1, "Select Stars"),
  priceQuality: Yup.number().integer().min(1, "Select Stars"),
  camera: Yup.number().integer().min(1, "Select Stars"),
  callsQuality: Yup.number().integer().min(1, "Select Stars"),
  battery: Yup.number().integer().min(1, "Select Stars"),
  generalProductRating: Yup.number().integer().min(1, "Select Stars"),
  manufacturingQuality: Yup.number().integer().min(1, "Select Stars"),
  productPros: Yup.string().required("Required"),
  productCons: Yup.string().required("Required"),
  companyPros: Yup.string().required("Required"),
  companyCons: Yup.string().required("Required"),
  invitationCode: Yup.string().required("Required"),
});
const handleInitialValues = (fieldName, empty = "") => {
  return sessionStorage.getItem(fieldName)
    ? sessionStorage.getItem(fieldName)
    : empty;
};
const Basic = ({ ...props }) => {
  const textContainer = useSelector((state) => {
    return state.language.textContainer;
  });
  const listOfRatings = [
    { fieldName: "productBuildRating", text: textContainer.productBuildRating },
    { fieldName: "productUIRating", text: textContainer.productUIRating },
    { fieldName: "productPriceRating", text: textContainer.productPriceRating },
    {
      fieldName: "productCameraRating",
      text: textContainer.productCameraRating,
    },
    {
      fieldName: "productCallQualityRating",
      text: textContainer.productCallQualityRating,
    },
    {
      fieldName: "productBatteryRating",
      text: textContainer.productBatteryRating,
    },
  ];
  const listOfReviewFields = [
    { fieldName: "productPros", text: textContainer.productPros },
    { fieldName: "productCons", text: textContainer.productCons },
    { fieldName: "companyPros", text: textContainer.companyPros },
    { fieldName: "companyCons", text: textContainer.companyCons },
    { fieldName: "invitationCode", text: textContainer.invitationCode },
  ];
  return (
    <>
      <Typography variant="h2" component="h2">
        {textContainer.pageName}
      </Typography>
      <form onSubmit={props.handleSubmit}>
        <Typography variant="h6">{textContainer.selectProduct}</Typography>
        <SearchBar searchTitle={textContainer.selectProductLabel}></SearchBar>
        <br />
        <FormikDatePicker
          fieldName="purchaseDate"
          label={textContainer.productAgeLabel}
          text={textContainer.productAge}
          textSize="h6"
        />
        <FormikStar
          fieldName="productGeneralRating"
          text={textContainer.productGeneralRating}
          textSize="h5"
        />
        {listOfRatings.map((comp) => {
          return (
            <div key={comp.fieldName}>
              <FormikStar
                fieldName={comp.fieldName}
                text={comp.text}
                isVertical={false}
                starDimension="25px"
                starSpacing="2px"
              />
            </div>
          );
        })}
        {listOfReviewFields.map((comp, i) => {
          return (
            <div key={comp.fieldName}>
              <FormikTextField
                fieldName={comp.fieldName}
                text={comp.text}
                label={comp.text}
              />
              {i === 1 ? (
                <FormikStar
                  fieldName={"manufacturingQuality"}
                  text={textContainer.manufacturingQuality}
                  textSize="h5"
                />
              ) : null}
            </div>
          );
        })}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="outlined"
            disabled={props.isSubmitting}
            sx={{
              flexGrow: 1,
            }}
          >
            {textContainer.submitButton}
          </Button>
        </Box>
      </form>
    </>
  );
};
const AddReviewFormik = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Formik
        initialValues={{
          productGeneralRating: parseInt(
            handleInitialValues("productGeneralRating", 0)
          ),
          productBuildRating: parseInt(
            handleInitialValues("productBuildRating", 0)
          ),
          productUIRating: parseInt(handleInitialValues("productUIRating", 0)),
          productPriceRating: parseInt(
            handleInitialValues("productPriceRating", 0)
          ),
          productCameraRating: parseInt(
            handleInitialValues("productCameraRating", 0)
          ),
          productCallQualityRating: parseInt(
            handleInitialValues("productCallQualityRating", 0)
          ),
          productBatteryRating: parseInt(
            handleInitialValues("productBatteryRating", 0)
          ),
          productManufacturerRating: parseInt(
            handleInitialValues("productManufacturerRating", 0)
          ),
          purchaseDate: handleInitialValues("purchaseDate"),
          productPros: handleInitialValues("productPros"),
          productCons: handleInitialValues("productCons"),
          companyPros: handleInitialValues("companyPros"),
          companyCons: handleInitialValues("companyCons"),
          invitationCode: handleInitialValues("invitationCode"),
        }}
        validationSchema={BasicValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          sessionStorage.clear();
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            navigate("../");
            setSubmitting(false);
          }, 400);
        }}
      >
        {(props) => <Basic {...props} />}
      </Formik>
    </div>
  );
};

export default AddReviewFormik;
