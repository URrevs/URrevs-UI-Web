import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import ReviewTextField from "../Components/Form/ReviewTextField";
import StarRating from "../Components/Form/StarRating";
import { SearchBar } from "../Components/MainLayout/Search/SearchBar";

const db_labels = {
  db_review_title_userName: "user_name",
  db_review_title_userId: "user_id",
  db_review_title_userPhoto: "user_avatar",
  db_review_title_signed: "shown",
  db_review_title_approved: "approved",
  db_review_title_userEmail: "email",
  db_review_title_comments: "comments",
  db_review_title_likes: "likes",
  db_review_title_reviewDate: "date_rev",
  db_review_title_brand: "brand",
  db_review_title_brand_pros: "brand_pros",
  db_review_title_brand_cons: "brand_cons",
  db_review_title_brand_rate: "brand_rate",
  db_review_title_facebook: "facebook",
  db_review_title_review_id: "review_id",
  db_review_title_twitter: "twitter",
  db_review_title_youtube: "youtube",
  db_review_views: "views",
  db_review_title_phoneType: "product",
  db_review_title_dateBuy: "date_buy",
  db_review_title_pros: "pros",
  db_review_title_cons: "cons",
  db_review_title_general_stars: "rate",
  db_review_title_manufacturingStars: "rate1",
  db_review_title_uiStars: "rate2",
  db_review_title_valueForPriceStars: "rate3",
  db_review_title_cameraStars: "rate4",
  db_review_title_callsStars: "rate5",
  db_review_title_batteryStars: "rate6",
};
const AddReview = () => {
  const textContainer = useSelector((state) => {
    return state.language.textContainer.addRevLabels;
  });
  const photo = useSelector((state) => state.auth.photo);
  const name = useSelector((state) => state.auth.name);
  const email = useSelector((state) => state.auth.email);
  const [error] = useState({
    purchaseDate: false,
    productGeneralRating: false,
    productBuildRating: false,
    productUIRating: false,
    productPriceRating: false,
    productCameraRating: false,
    productCallQualityRating: false,
    productBatteryRating: false,
    productManufacturerRating: false,
    productPros: false,
    productCons: false,
    companyPros: false,
    companyCons: false,
    invitationCode: false,
  });
  const [formValues, setFormValues] = useState({
    purchaseDate: null,
    productGeneralRating: 0,
    productBuildRating: 0,
    productUIRating: 0,
    productPriceRating: 0,
    productCameraRating: 0,
    productCallQualityRating: 0,
    productBatteryRating: 0,
    productManufacturerRating: 0,
    productPros: "",
    productCons: "",
    companyPros: "",
    companyCons: "",
    invitationCode: "",
  });

  useEffect(() => {
    var fieldStorage = localStorage.getItem("formValues");
    if (fieldStorage) {
      fieldStorage = JSON.parse(fieldStorage);
      setFormValues(fieldStorage);
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFormValues = {
      [db_labels.db_review_title_userName]: name,
      [db_labels.db_review_title_userPhoto]: photo,
      [db_labels.db_review_title_userEmail]: email,
      [db_labels.db_review_title_userId]: "tYCHUoxpDZTVIYuKtrZwVcqkqni2",
      [db_labels.db_review_title_signed]: "1",
      [db_labels.db_review_title_reviewDate]: new Date(),
      [db_labels.db_review_title_phoneType]: "A70",
      [db_labels.db_review_title_brand]: "Xiamoi",
      [db_labels.db_review_title_dateBuy]: formValues.purchaseDate,
      [db_labels.db_review_title_pros]: formValues.productPros,
      [db_labels.db_review_title_cons]: formValues.productCons,
      [db_labels.db_review_title_general_stars]:
        formValues.productGeneralRating,
      [db_labels.db_review_title_manufacturingStars]:
        formValues.productManufactureRate,
      [db_labels.db_review_title_uiStars]: formValues.productUIRating,
      [db_labels.db_review_title_valueForPriceStars]:
        formValues.productPriceRating,
      [db_labels.db_review_title_cameraStars]: formValues.productCameraRating,
      [db_labels.db_review_title_callsStars]:
        formValues.productCallQualityRating,
      [db_labels.db_review_title_batteryStars]: formValues.productBatteryRating,
      [db_labels.db_review_title_approved]: true,
      [db_labels.db_review_title_brand_pros]: "",
      [db_labels.db_review_title_brand_cons]: "",
      [db_labels.db_review_title_brand_rate]: "",
      [db_labels.db_review_title_facebook]: "",
      [db_labels.db_review_title_youtube]: "",
      [db_labels.db_review_title_twitter]: "",
      [db_labels.db_review_views]: 0,
    };
    localStorage.removeItem("formValues");
    //addReview(formValues);
  };

  const arrayLabels = Object.keys(textContainer.Ratings);
  return (
    <div style={{ overflow: "auto" }}>
      <Typography variant="h2" component="h2">
        {textContainer.pageName}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Typography variant="h6">{textContainer.selectProduct}</Typography>
        <SearchBar searchTitle={textContainer.selectProductLabel}></SearchBar>
        <br />
        <Typography variant="h6" sx={{ pb: "5px" }}>
          {textContainer.productAge}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label={textContainer.productAgeLabel}
            value={formValues.purchaseDate}
            onChange={(newValue) => {
              setFormValues({
                ...formValues,
                purchaseDate: newValue,
              });
            }}
            error={error.purchaseDate}
            emptyLabel="Enter Date"
            renderInput={(params) => <TextField {...params} />}
          />
          <br />
        </LocalizationProvider>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <StarRating
            text={textContainer.productGeneralRating}
            starValue={formValues.productGeneralRating}
            onRatingChange={(rating) => {
              const newRates = {
                ...formValues,
                productGeneralRating: rating,
              };
              setFormValues(newRates);
              localStorage.setItem("formValues", JSON.stringify(newRates));
            }}
          />
        </Box>
        {arrayLabels.map((label) => {
          const changeRatings = (rating) => {
            let newRates = { ...formValues };
            newRates[label] = rating;
            setFormValues(newRates);
            localStorage.setItem("formValues", JSON.stringify(formValues));
          };
          return (
            <div key={label}>
              <StarRating
                text={textContainer.Ratings[label]}
                starValue={formValues[label]}
                onRatingChange={changeRatings}
                isVertical={false}
                starRatedColor="orange"
                starHoverColor="orange"
              />
            </div>
          );
        })}
        <ReviewTextField
          text={textContainer.productPros}
          onFieldChange={(value) =>
            setFormValues({ ...formValues, productPros: value })
          }
          onFieldBlur={() => {
            localStorage.setItem("formValues", JSON.stringify(formValues));
          }}
          fieldValue={formValues.productPros}
          fieldLabel={textContainer.prosLabel}
        />
        <ReviewTextField
          text={textContainer.productCons}
          formKey={"productCons"}
          onFieldChange={(value) =>
            setFormValues({ ...formValues, productCons: value })
          }
          onFieldBlur={() => {
            localStorage.setItem("formValues", JSON.stringify(formValues));
          }}
          fieldValue={formValues.productCons}
          fieldLabel={textContainer.consLabel}
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <StarRating
            text={textContainer.productManufacturerRating}
            starValue={formValues.productManufacturerRating}
            onRatingChange={(rating) => {
              const newRates = {
                ...formValues,
                productManufacturerRating: rating,
              };
              setFormValues(newRates);
              localStorage.setItem("formValues", JSON.stringify(newRates));
            }}
            isVertical={true}
          />
        </Box>
        <ReviewTextField
          text={
            textContainer.companyPros + "Xiaomi" + textContainer.questionMark
          }
          formKey={"companyPros"}
          fieldLabel={textContainer.prosLabel}
          onFieldChange={(value) =>
            setFormValues({ ...formValues, companyPros: value })
          }
          onFieldBlur={() => {
            localStorage.setItem("formValues", JSON.stringify(formValues));
          }}
          fieldValue={formValues.companyPros}
        />
        <ReviewTextField
          text={`${textContainer.companyCons}
                Xiaomi${textContainer.questionMark}`}
          onFieldChange={(value) =>
            setFormValues({ ...formValues, companyCons: value })
          }
          onFieldBlur={() => {
            localStorage.setItem("formValues", JSON.stringify(formValues));
          }}
          fieldValue={formValues.companyCons}
          fieldLabel={textContainer.consLabel}
        />
        <ReviewTextField
          text={textContainer.invitationCode}
          onFieldChange={(value) => {
            setFormValues({ ...formValues, invitationCode: value });
          }}
          onFieldBlur={() => {
            localStorage.setItem("formValues", JSON.stringify(formValues));
          }}
          fieldValue={formValues.invitationCode}
          fieldLabel={textContainer.invitationCodeLabel}
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button type="submit" variant="outlined">
            {textContainer.submitButton}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddReview;
