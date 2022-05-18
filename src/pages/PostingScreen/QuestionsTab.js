import { useTheme } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Stack, Typography } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import OrangeGradientButton from "../../Components/Buttons/OrangeGradientButton";
import FormikSearchComponent from "../../Components/Form/FormikSearchComponent";
import FormikTextField from "../../Components/Form/FormikTextField";
import { useSearchAllMutation } from "../../services/search";
import { useAddPhoneQuestionMutation } from "../../services/phone_questions";
import { useAddCompanyQuestionMutation } from "../../services/company_questions";
export const QuestionsTab = () => {
  const [addPhoneQuestion] = useAddPhoneQuestionMutation();
  const [addCompanyQuestion] = useAddCompanyQuestionMutation();

  const [addQuestionError, setAddQuestionError] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      id: "",
      content: "",
    },
    // validationSchema: {},
    onSubmit: async (values) => {
      console.log(values.id.type);
      try {
        if (values.id.type === "company") {
          await addCompanyQuestion({
            content: values.content,
            company: values.id.pid,
          });
        } else {
          await addPhoneQuestion({
            content: values.content,
            phone: values.id.pid,
          });
        }
      } catch (e) {
        setAddQuestionError(e);
        console.log(e);
      }
    },
  });
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
  const textContainer = useSelector((state) => state.language.textContainer);
  const pageDictionary = {
    chooseProduct: textContainer.chooseProduct,
    writeProductName: textContainer.writeProductName,
    writeYourQuestion: textContainer.writeYourQuestion,
    question: textContainer.question,
    postQuestion: textContainer.postQuestion,
  };
  const theme = useTheme();

  const [searchFn] = useSearchAllMutation();

  return (
    <React.Fragment>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          {/* Searchbar */}
          {/* TODO:
            Need a new searchbar that searches company OR phone and returns that companyId/phoneId
            and type:phone/company
        */}
          <Typography variant="S18W500C050505">
            {pageDictionary.chooseProduct + ":"}
          </Typography>
          <FormikSearchComponent
            fieldName="id"
            label={pageDictionary.writeProductName}
            searchFn={searchFn}
            toGetManufacturingCompany={false}
          />
          {renderFields(
            pageDictionary.writeYourQuestion,
            "content",
            pageDictionary.question
          )}

          {/* Submit Button */}
          <OrangeGradientButton
            type="submit"
            color="red"
            sx={{ width: "100%", textAlign: "center", marginTop: "20px" }}
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
                {pageDictionary.postQuestion}
              </Typography>
            </Box>
          </OrangeGradientButton>
        </form>
      </FormikProvider>
    </React.Fragment>
  );
};
