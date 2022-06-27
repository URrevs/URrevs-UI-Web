import { useTheme } from "@emotion/react";
import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import { DialogText } from "../../Components/Dialogs/DialogText";
import FormikDatePicker from "../../Components/Form/FormikDatePicker";
import FormikSearchComponent from "../../Components/Form/FormikSearchComponent";
import FormikStar from "../../Components/Form/FormikStar";
import FormikTextField from "../../Components/Form/FormikTextField";
import { useSearchPhonesOnlyMutation } from "../../services/search";
import { useAppSelector } from "../../store/hooks";
import HelpIcon from "@mui/icons-material/Help";
import { FormSubmitButton } from "./FormSubmitButton";

/*Documentation */
/*
##TODO:
- Fix error messages when user changes language (hopefully it is solved when switch language feature is implemented)
##TEST:
- SearchComponent:{
  1-If input is empty:Err1
  2-If user didn't select: Err2
  3-If user input is gibberish:Err3
}
*/
const handleInitialValues = (fieldName, empty = "") => {
  return sessionStorage.getItem(fieldName)
    ? sessionStorage.getItem(fieldName)
    : empty;
};
export const AddReviewTab = ({ ...props }) => {
  const textContainer = useAppSelector((state) => {
    return state.language.textContainer;
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const pageDictionary = {
    referralCodeHelpPrompt: textContainer.referralCodeHelpPrompt,
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

  const renderFields = (text, fieldName, label, controlled = true) => {
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
  const [searchFn] = useSearchPhonesOnlyMutation();

  return (
    <React.Fragment>
      <Modal open={open} onClose={handleClose} dir={theme.direction}>
        <Box>
          <DialogText
            text={pageDictionary.referralCodeHelpPrompt}
            onClose={handleClose}
          />
        </Box>
      </Modal>
      <form onSubmit={props.handleSubmit}>
        {/* Searchbar */}
        {/* Todo:
          Put X icon instead of SearchIcon and lock SearchBar with previous result
          When X is hit delete id and CompanyId entries from state
          ERROR: When you overwrite a correct search result with a wrong one it passes validation
          Walkaround: display snackbar with the error
          Fix: add validation to companyId probably
  
          */}
        <Typography variant="S18W500C050505">
          {pageDictionary.chooseProduct + ":"}
        </Typography>
        <FormikSearchComponent
          fieldName="chooseProduct"
          label={textContainer.writeProductName}
          searchFn={searchFn}
          toGetManufacturingCompany={true}
        />
        <br />
        {/* Datepicker*/}
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
        {/* Star Ratings  */}
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
        {/* TextFields */}
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
        {/* RENDER COMPANY REVIEW FIELDS */}
        {props.values.companyId?._id ? (
          <React.Fragment>
            <Typography variant="S18W500C050505">
              {pageDictionary.rateManufacturer}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <FormikStar fieldName="rateManufacturer" />
            </Box>
            {renderFields(
              `${pageDictionary.likeAbout} ${props.values.companyId.name}`,
              "likeAbout",
              pageDictionary.pros
            )}
            {renderFields(
              `${pageDictionary.hateAbout} ${props.values.companyId.name}`,
              "hateAbout",
              pageDictionary.cons
            )}
          </React.Fragment>
        ) : null}
        <Typography
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          variant="S18W500C050505"
        >
          {pageDictionary.enterInvitationCode + ":"}
          <IconButton
            onClick={handleOpen}
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
        {/* Invitation Code*/}
        <FormikTextField
          fieldName={"invitationCode"}
          label={pageDictionary.invitationCode}
          isControlled={false}
        />
        {/* Submit Button */}
        <FormSubmitButton submitLabel={pageDictionary.postReview} />
      </form>
    </React.Fragment>
  );
};
