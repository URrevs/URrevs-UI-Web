import { useTheme } from "@emotion/react";
import { Field } from "formik";
import React from "react";
import { useGetManufacturingCompanyMutation } from "../../services/phones";
import SearchComponent from "../SearchComponent";
const FormikSearchComponent = ({ fieldName, label }) => {
  const theme = useTheme();
  const [getManufacturingCompany] = useGetManufacturingCompanyMutation();
  return (
    <Field name={fieldName}>
      {({ field: { value }, form: { setFieldValue }, meta }) => (
        <React.Fragment>
          <SearchComponent
            isFormik={true}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            setCompareItem={async (response) => {
              setFieldValue(fieldName, response.pid);
              const companyId = await getManufacturingCompany(response.pid);
              sessionStorage.setItem(fieldName, response.pid);
              setFieldValue("companyId", companyId.data);
              sessionStorage.setItem(
                "companyId",
                JSON.stringify(companyId.data)
              );
            }}
            label={label}
          />
        </React.Fragment>
      )}
    </Field>
  );
};
export default FormikSearchComponent;
