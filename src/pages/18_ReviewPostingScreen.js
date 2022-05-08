import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HelpIcon from "@mui/icons-material/Help";
import { SearchBar } from "../Components/MainLayout/Search/SearchBar";
import FormikDatePicker from "../Components/Form/FormikDatePicker";
import AddIcon from "@mui/icons-material/Add";
import FormikTextField from "../Components/Form/FormikTextField";
import FormikStar from "../Components/Form/FormikStar";
import SearchComponent from "../Components/SearchComponent";
import OrangeGradientButton from "../Components/Buttons/OrangeGradientButton";
import { useTheme } from "@emotion/react";

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
  const theme = useTheme();
  const pageDictionary = {
    chooseProduct: textContainer.chooseProduct,
    writeProductName: textContainer.writeProductName,
    howLong: textContainer.howLongHaveYouOwnedThisProduct,
    overAllExp: textContainer.rateOverallExpericence,
    purchaseDate: textContainer.purchaseDate,
    manufacturingQuality: textContainer.manufacturingQuality,
    userInterface: textContainer.userInterface,
    priceQuality: textContainer.priceQuality,
    camera: textContainer.camera,
    callsQuality: textContainer.callsQuality,
    battery: textContainer.battery,
    pros: textContainer.pros,
    cons: textContainer.cons,
    likeAboutProduct: textContainer.whatDoYouLikeAboutThisProduct,
    hateAboutProduct: textContainer.whatDoYouHateAboutThisProduct,
    rateManufacturer: textContainer.howDoYouRateTheManufacturer,
    likeAbout: textContainer.WhatDoYouLikeAbout,
    hateAbout: textContainer.whatDoYouHateAbout,
    invitationCode: textContainer.invitationCode,
    enterInvitationCode: textContainer.enterInvitationCode,
    postReview: textContainer.postReview,
  };
  const listOfRatings = [
    {
      fieldName: "manufacturingQuality",
      text: pageDictionary.manufacturingQuality,
    },
    { fieldName: "userInterface", text: pageDictionary.userInterface },
    {
      fieldName: "priceQuality",
      text: pageDictionary.priceQuality,
    },
    {
      fieldName: "camera",
      text: pageDictionary.camera,
    },
    {
      fieldName: "callsQuality",
      text: pageDictionary.callsQuality,
    },
    {
      fieldName: "battery",
      text: pageDictionary.battery,
    },
  ];
  const renderFields = (text, fieldName, label, controlled = false) => {
    return (
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Typography sx={{}} variant="S18W500C050505">
          {text}
        </Typography>
        <FormikTextField
          fieldName={fieldName}
          label={label}
          isControlled={controlled}
        />
      </Stack>
    );
  };
  return (
    <React.Fragment>
      <form onSubmit={props.handleSubmit}>
        <Typography variant="h6">
          {pageDictionary.chooseProduct + ":"}
        </Typography>
        <SearchComponent label={pageDictionary.writeProductName} />
        <br />
        <Typography variant="S18W500C050505">
          {pageDictionary.howLong}
        </Typography>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <FormikDatePicker
            isRequired={false}
            label={pageDictionary.purchaseDate}
            fieldName={"purchaseDate"}
          />
        </Stack>
        <Typography variant="S18W500C050505">
          {pageDictionary.overAllExp + ":"}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <FormikStar fieldName="overAllExp" />
        </Box>
        {listOfRatings.map((comp) => {
          return (
            <div
              key={comp.fieldName}
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="S18W500C050505">{comp.text}</Typography>
              <FormikStar fieldName={comp.fieldName} />
            </div>
          );
        })}

        {renderFields(
          pageDictionary.likeAboutProduct,
          "likeAboutProduct",
          pageDictionary.pros
        )}

        {renderFields(
          pageDictionary.hateAboutProduct,
          "hateAboutProduct",
          pageDictionary.cons
        )}

        <Typography variant="S18W500C050505">
          {pageDictionary.rateManufacturer + ":"}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <FormikStar fieldName="rateManufacturer" />
        </Box>
        {renderFields(
          pageDictionary.likeAbout,
          "likeAbout",
          pageDictionary.pros
        )}
        {renderFields(
          `${pageDictionary.hateAbout}`,
          "hateAbout",
          pageDictionary.cons
        )}
        <Typography
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          variant="S18W500C050505"
        >
          {pageDictionary.enterInvitationCode + ":"}
          <IconButton
            sx={{
              padding: 0,
              marginLeft: "4px",
            }}
          >
            <HelpIcon
              sx={{
                padding: 0,
                fontSize: "25px",
                color: theme.palette.defaultIconColor,
              }}
            />
          </IconButton>
        </Typography>
        <br />
        <FormikTextField
          fieldName={"enterInvitationCode"}
          label={pageDictionary.invitationCode}
          isControlled={false}
        />

        <OrangeGradientButton
          color="red"
          sx={{ width: "100%", textAlign: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <AddIcon
              sx={{
                color: theme.palette.defaultRedBtnIconColor,
                fontSize: "28px",
              }}
            />
            <Typography variant="S18W700Cffffff">
              {pageDictionary.postReview}
            </Typography>
          </Box>
        </OrangeGradientButton>
      </form>
    </React.Fragment>
  );
};
const ReviewPostingScreen = () => {
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

export default ReviewPostingScreen;
