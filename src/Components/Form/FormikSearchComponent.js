import { useTheme } from "@emotion/react";
import { Field } from "formik";
import React from "react";
import { useGetManufacturingCompanyMutation } from "../../services/phones";
import SearchComponent from "../SearchComponent";
const FormikSearchComponent = ({
  fieldName,
  label,
  // error,
  searchFn,
  toGetManufacturingCompany = false,
}) => {
  const theme = useTheme();
  const [getManufacturingCompany] = useGetManufacturingCompanyMutation();

  return (
    <Field name={fieldName}>
      {({ field: { value }, form: { setFieldValue, setFieldError }, meta }) => (
        <React.Fragment>
          <SearchComponent
            isFormik={true}
            error={Boolean(meta.error?.id)}
            helperText={meta.touched && meta.error?.id}
            setError={(bool) => {
              setFieldError(fieldName, bool);
            }}
            onResult={async (response) => {
              setFieldValue(fieldName, response);

              // To fetch company for reviewposting
              if (toGetManufacturingCompany && response.id !== "") {
                const companyId = await getManufacturingCompany(response.id);
                setFieldValue("companyId", companyId.data);
                sessionStorage.setItem(
                  "companyId",
                  JSON.stringify(companyId.data)
                );
              }
            }}
            label={label}
            searchFn={searchFn}
          />
        </React.Fragment>
      )}
    </Field>
  );
};
export default FormikSearchComponent;
