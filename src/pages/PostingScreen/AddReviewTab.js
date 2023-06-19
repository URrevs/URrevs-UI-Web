import { useTheme } from "@emotion/react";
import HelpIcon from "@mui/icons-material/Help";
import {
  Box,
  Card,
  Divider,
  IconButton,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DialogText } from "../../Components/Dialogs/DialogText";
import FormikDatePicker from "../../Components/Form/DatePicker/FormikDatePicker";
import FormikSearchComponent from "../../Components/Form/FormikSearchComponent";
import FormikStar from "../../Components/Form/FormikStar";
import FormikTextField from "../../Components/Form/FormikTextField";
import { StarCounter } from "../../Components/StarCounter/StarCounter";
import { useGetManufacturingCompanyMutation } from "../../services/phones";
import { useSearchPhonesOnlyMutation } from "../../services/search";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useCallbackPrompt } from "../../hooks/useCallbackPrompt";
import { FormSubmitButton } from "./FormSubmitButton";
import { ConfirmationBody } from "../../Components/Dialogs/ConfiramtionBody";
import { postingModalActions } from "../../store/uiPostingModalSlice";

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
  const location = useLocation();
  const navigate = useNavigate();

  const textContainer = useAppSelector((state) => {
    return state.language.textContainer;
  });
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [openStar, setOpenStar] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const pageDictionary = {
    reviewEncouragement: textContainer.reviewEncouragement,
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
      <Stack spacing={1} sx={{ width: "100%" }}>
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
    // sessionStorage.setItem(
    //   "chooseProduct",
    //   JSON.stringify(props.values.chooseProduct)
    // );
    props.setFieldValue("companyId", companyId.data);
    // sessionStorage.setItem("companyId", JSON.stringify(companyId.data));
  };
  React.useEffect(() => {
    if (props.values.chooseProduct.id !== "") handleManufacturingCompany();
  }, []);

  // Star Counter Use Effect
  // Can be easily done with measuring contributions

  React.useEffect(() => {
    const limit = 1200;
    let sum = 0;
    let sumChar = 0;
    sum = props.values.chooseProduct.label ? ++sum : sum;
    sum = props.values.invitationCode ? ++sum : sum;
    sum = props.values.purchaseDate ? ++sum : sum;
    sum = props.values.battery > 0 ? ++sum : sum;
    sum = props.values.callsQuality > 0 ? ++sum : sum;
    sum = props.values.camera > 0 ? ++sum : sum;
    sum = props.values.manufacturingQuality > 0 ? ++sum : sum;
    sum = props.values.overAllExp > 0 ? ++sum : sum;
    sum = props.values.priceQuality > 0 ? ++sum : sum;
    sum = props.values.rateManufacturer > 0 ? ++sum : sum;
    sum = props.values.userInterface > 0 ? ++sum : sum;
    sumChar += props.values.likeAboutProduct.length;
    sumChar += props.values.hateAboutProduct.length;
    sumChar += props.values.likeAbout.length; //Company
    sumChar += props.values.hateAbout.length; //Company
    sumChar = sumChar > limit ? limit : sumChar; // Not really necessary
    setCount((sum * 50) / 11 + (sumChar * 50) / limit);
    if (sum >= 1 || sumChar >= 1) setShowDialog(true);
    else setShowDialog(false);
  }, [props.values]);
  return (
    <React.Fragment>
      <Modal open={showPrompt} direction={theme.direction}>
        <div style={{ direction: theme.direction }}>
          <ConfirmationBody
            title={textContainer.doYouReallyWantToLeave}
            warningText={textContainer.thisWillCauseTheDataYouEnteredToBeErased}
            yesAction={() => {
              confirmNavigation();
              sessionStorage.clear();
              dispatch(postingModalActions.hidePostingModal());
            }}
            noAction={cancelNavigation}
          />
        </div>
      </Modal>
      <Modal open={open} onClose={handleClose} dir={theme.direction}>
        <Box>
          <DialogText text={pageDictionary.referralCodeHelpPrompt} />
        </Box>
      </Modal>
      <Modal
        open={openStar}
        onClose={() => {
          setOpenStar(false);
        }}
        dir={theme.direction}
      >
        <Box>
          <DialogText text={pageDictionary.reviewEncouragement} />
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
        {/* Star Counter */}
        <div
          style={{
            position: "sticky",
            zIndex: 1000,
            border:
              theme.isMobile &&
              location.pathname === "/add-review" &&
              `2px solid ${theme.palette.background.default}`,
            backgroundColor:
              theme.isMobile && location.pathname === "/add-review"
                ? theme.palette.background.default
                : theme.palette.modalColor,
            top:
              theme.isMobile && location.pathname === "/add-review"
                ? "45px"
                : 0,
          }}
          onClick={() => {
            setOpenStar(true);
          }}
        >
          <StarCounter value={count} />
        </div>
        <div style={{ height: "15px" }}></div>
        <Divider />
        <Stack spacing={1}>
          <div></div>
          <div></div>
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
          <div></div>
          <div></div>
        </Stack>
        {/* Datepicker*/}

        <Stack spacing={1} sx={{ width: "100%" }}>
          <Typography variant="S18W500C050505">
            {pageDictionary.howLong}
          </Typography>
          <FormikDatePicker
            isRequired={false}
            label={pageDictionary.purchaseDate}
            fieldName={"purchaseDate"}
          />
          <div></div>
          <div></div>
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
        <Stack spacing={2}>
          <div></div>
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
          <div></div>
        </Stack>
        {/* RENDER COMPANY REVIEW FIELDS */}
        {props.values.companyId?._id ? (
          <React.Fragment>
            <Typography variant="S18W500C050505">
              {pageDictionary.rateManufacturer}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <FormikStar fieldName="rateManufacturer" />
            </Box>
            <Stack spacing={2}>
              <div></div>
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
              <div></div>
            </Stack>
          </React.Fragment>
        ) : null}
        <Stack spacing={1}>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            variant="S18W500C050505"
          >
            {pageDictionary.enterInvitationCode + ":"}
            {/* <Tooltip title={pageDictionary.referralCodeHelpPrompt}>
            <HelpIcon
              sx={{
                marginLeft: "4px",
                padding: 0,
                fontSize: "25px",
                color: theme.palette.defaultIconColor,
              }}
            />
          </Tooltip> */}
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
          {/* Invitation Code */}
          <FormikTextField
            fieldName={"invitationCode"}
            label={pageDictionary.invitationCode}
            isControlled={true}
            multiline={false}
          />
        </Stack>
        {/* Submit Button */}
        <FormSubmitButton
          loading={props.isSubmitting}
          submitLabel={pageDictionary.postReview}
        />
      </form>
    </React.Fragment>
  );
};
