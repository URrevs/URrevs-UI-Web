import { Modal, Stack, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikSearchComponent from "../../Components/Form/FormikSearchComponent";
import FormikTextField from "../../Components/Form/FormikTextField";
import { GAevent } from "../../functions/gaEvents";
import { useAddCompanyQuestionMutation } from "../../services/company_questions";
import { useAddPhoneQuestionMutation } from "../../services/phone_questions";
import { useSearchAllMutation } from "../../services/search";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { postingModalActions } from "../../store/uiPostingModalSlice";
import { FormSubmitButton } from "./FormSubmitButton";
import React from "react";
import { useCallbackPrompt } from "../../hooks/useCallbackPrompt";
import { ConfirmationBody } from "../../Components/Dialogs/ConfiramtionBody";
import { useTheme } from "@emotion/react";

/* DOCUMENTATION */
/*
BUGS:
Search Component:
Display error only when hitting submit button and then disable error when user types something.
DATA:
Search Product or Company => spoc type object
spoc = {
label: "Acer"
id: "6256a7575f87fa90093a4bd0"
type: "company"
}
User Question => question type string
question = ""

##TODO:
- When finally implementing language change make sure that error messages change language too
and not just when page reloads

- Search Component
 */
export const QuestionsTab = ({ initValues }) => {
  const handleInitialValues = (fieldName, initialValue) => {
    const stored = sessionStorage.getItem(fieldName);
    if (stored) {
      if (typeof initialValue === "object") return JSON.parse(stored);
      if (typeof initialValue === "number") return parseInt(stored);
      return stored;
    } else {
      return initialValue;
    }
  };
  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
  // UI, theme, and Text:
  const theme = useTheme();
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const pageDictionary = {
    yourQuestionRegarding: textContainer.yourQuestionRegarding,
    enterYourQuestionErrorMsg: textContainer.enterYourQuestionErrorMsg,
    searchForAProductOrACompany: textContainer.searchForAProductOrACompany,
    writeYourQuestion: textContainer.writeYourQuestion,
    question: textContainer.question,
    postQuestion: textContainer.postQuestion,
  };
  // RTK:
  const [searchFn] = useSearchAllMutation();
  const dispatch = useAppDispatch();
  const [addPhoneQuestion] = useAddPhoneQuestionMutation();
  const [addCompanyQuestion] = useAddCompanyQuestionMutation();
  // const [addQuestionError, setAddQuestionError] = React.useState(null);
  //Handle Submit
  const handleSubmit = async (values, { setSubmitting }) => {
    // alert(JSON.stringify(values));
    try {
      if (values.spoc.type === "company") {
        await addCompanyQuestion({
          content: values.question,
          company: values.spoc.id,
        });
      } else if (values.spoc.type === "phone") {
        await addPhoneQuestion({
          content: values.question,
          phone: values.spoc.id,
        });
      }
      sessionStorage.clear();
      GAevent("User interaction", "Adding question", "Adding question", false);
    } catch (e) {}
    dispatch(postingModalActions.hidePostingModal());
    setSubmitting(false);
  };
  // Validation:
  const QuestionValidationSchema = Yup.object().shape({
    spoc: Yup.object().shape({
      label: Yup.string().required(),
      id: Yup.string().required(),
      type: Yup.string().required(),
    }),
    question: Yup.string().required(pageDictionary.enterYourQuestionErrorMsg),
  });
  // Render Functions:
  //Search
  const renderSearch = (query) => (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <Typography variant="S18W500C050505">
        {pageDictionary.yourQuestionRegarding}
      </Typography>
      <FormikSearchComponent
        fieldName="spoc"
        query={query}
        label={pageDictionary.searchForAProductOrACompany}
        searchFn={searchFn}
      />
      <div></div>
    </Stack>
  );
  const ConfirmationWindow = ({ values }) => {
    React.useEffect(() => {
      let sum = 0;
      sum = values.spoc.label ? ++sum : sum;
      sum = values.question ? ++sum : sum;
      if (sum >= 1) setShowDialog(true);
    }, [values]);
    return (
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
    );
  };

  const renderField = () => {
    return (
      <Stack spacing={1} sx={{ width: "100%" }}>
        <Typography sx={{}} variant="S18W500C050505">
          {pageDictionary.writeYourQuestion}
        </Typography>
        <FormikTextField
          fieldName={"question"}
          label={pageDictionary.question}
          isControlled={true}
        />
        <div></div>
      </Stack>
    );
  };

  return (
    <Formik
      initialValues={{
        spoc: handleInitialValues("spoc", initValues),
        question: handleInitialValues("question", ""),
      }}
      onSubmit={handleSubmit}
      validationSchema={QuestionValidationSchema}
    >
      {(formik) => (
        <div>
          <ConfirmationWindow values={formik.values} />
          <Form>
            {renderSearch(formik.values.spoc.label)}
            {renderField()}
            <FormSubmitButton
              loading={formik.isSubmitting}
              submitLabel={pageDictionary.postQuestion}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};
