import { Stack, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormikSearchComponent from "../../Components/Form/FormikSearchComponent";
import FormikTextField from "../../Components/Form/FormikTextField";
import { useAddCompanyQuestionMutation } from "../../services/company_questions";
import { useAddPhoneQuestionMutation } from "../../services/phone_questions";
import { useSearchAllMutation } from "../../services/search";
import { useAppSelector } from "../../store/hooks";
import { FastFormikTextField } from "./FastFormikTextField";
import { FormSubmitButton } from "./FormSubmitButton";

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
  // UI, theme, and Text:
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
  const [addPhoneQuestion] = useAddPhoneQuestionMutation();
  const [addCompanyQuestion] = useAddCompanyQuestionMutation();
  // const [addQuestionError, setAddQuestionError] = React.useState(null);
  //Handle Submit
  const handleSubmit = async (values) => {
    console.log(JSON.stringify(values));
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
    } catch (e) {
      console.log(e);
    }
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
        toGetManufacturingCompany={false}
      />
      <div></div>
    </Stack>
  );
  //TextField
  const renderField = () => {
    return (
      <Stack spacing={1} sx={{ width: "100%" }}>
        <Typography sx={{}} variant="S18W500C050505">
          {pageDictionary.writeYourQuestion}
        </Typography>
        <FormikTextField
          fieldName={"question"}
          label={pageDictionary.question}
        />
        <div></div>
      </Stack>
    );
  };

  return (
    <Formik
      initialValues={{
        spoc: initValues,
        question: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={QuestionValidationSchema}
    >
      {(formik) => (
        <div>
          <Form>
            {renderSearch(formik.values.spoc.label)}
            {renderField()}
            <FormSubmitButton submitLabel={pageDictionary.postQuestion} />
          </Form>
        </div>
      )}
    </Formik>
  );
};
