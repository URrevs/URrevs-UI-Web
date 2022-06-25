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
      {({ field: { value }, form: { setFieldValue }, meta }) => (
        <React.Fragment>
          <SearchComponent
            isFormik={true}
            error={Boolean(meta.error?.pid)}
            helperText={meta.touched && meta.error?.pid}
            setCompareItem={async (response) => {
              setFieldValue(fieldName, response);

              // not to do this request in question tab
              if (toGetManufacturingCompany && response) {
                const companyId = await getManufacturingCompany(response.pid);
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
