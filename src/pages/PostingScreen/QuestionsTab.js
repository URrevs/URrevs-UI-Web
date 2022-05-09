import { useTheme } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import OrangeGradientButton from "../../Components/Buttons/OrangeGradientButton";
import FormikSearchComponent from "../../Components/Form/FormikSearchComponent";
import FormikTextField from "../../Components/Form/FormikTextField";

export const QuestionsTab = () => {
  const formik = useFormik({
    initialValues: {
      id: "",
      content: "",
    },
    validationSchema: {},
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
  };
  const theme = useTheme();
  return (
    <React.Fragment>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          {/* Searchbar */}
          <Typography variant="S18W500C050505">
            {pageDictionary.chooseProduct + ":"}
          </Typography>
          <FormikSearchComponent
            fieldName="id"
            label={pageDictionary.writeProductName}
          />
          {renderFields(
            pageDictionary.likeAboutProduct,
            "content",
            pageDictionary.pros
          )}
          {console.log(formik.values)}
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
                {pageDictionary.postReview}
              </Typography>
            </Box>
          </OrangeGradientButton>
        </form>
      </FormikProvider>
    </React.Fragment>
  );
};
