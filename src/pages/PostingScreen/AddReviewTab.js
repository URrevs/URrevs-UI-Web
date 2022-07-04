import { useTheme } from "@emotion/react";
import {
  Box,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { DialogText } from "../../Components/Dialogs/DialogText";
import FormikDatePicker from "../../Components/Form/DatePicker/FormikDatePicker";
import FormikSearchComponent from "../../Components/Form/FormikSearchComponent";
import FormikStar from "../../Components/Form/FormikStar";
import FormikTextField from "../../Components/Form/FormikTextField";
import { useSearchPhonesOnlyMutation } from "../../services/search";
import { useAppSelector } from "../../store/hooks";
import HelpIcon from "@mui/icons-material/Help";
import { FormSubmitButton } from "./FormSubmitButton";
import { useGetManufacturingCompanyMutation } from "../../services/phones";
import { FastField } from "formik";
import { StarCounter } from "../../Components/StarCounter/StarCounter";

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
// const handleInitialValues = (fieldName, empty = "") => {
//   return sessionStorage.getItem(fieldName)
//     ? sessionStorage.getItem(fieldName)
//     : empty;
// };
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

  const renderFields = (
    text,
    fieldName,
    label,
    multiline = true,
    controlled = true
  ) => {
    return (
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Typography sx={{}} variant="S18W500C050505">
          {text}
        </Typography>
        <FormikTextField
          fieldName={fieldName}
          label={label}
          multiline={multiline}
          isControlled={controlled}
        />
      </Stack>
    );
  };
  /*RTK */
  const [searchFn] = useSearchPhonesOnlyMutation();
  //To initialize companyId
  const [getManufacturingCompany] = useGetManufacturingCompanyMutation();
  const handleManufacturingCompany = async () => {
    const companyId = await getManufacturingCompany(
      props.values.chooseProduct.id
    );
    props.setFieldValue("companyId", companyId.data);
    sessionStorage.setItem("companyId", JSON.stringify(companyId.data));
  };
  React.useEffect(() => {
    if (props.values.chooseProduct.id !== "") handleManufacturingCompany();
  }, []);
  return (
    <React.Fragment>
      {/* <Stack spacing={1}>
          <StarCounter />
          <Divider />
        </Stack> */}
      <Modal open={open} onClose={handleClose} dir={theme.direction}>
        <Box>
          <DialogText text={pageDictionary.referralCodeHelpPrompt} />
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
          query={props.values.chooseProduct.label}
          label={textContainer.writeProductName}
          searchFn={searchFn}
          toGetManufacturingCompany
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
        {/* Invitation Code */}
        <FormikTextField
          fieldName={"invitationCode"}
          label={pageDictionary.invitationCode}
          isControlled={true}
          multiline={false}
        />
        {/* Submit Button */}
        <FormSubmitButton
          loading={props.isSubmitting}
          submitLabel={pageDictionary.postReview}
        />
      </form>
    </React.Fragment>
  );
};
