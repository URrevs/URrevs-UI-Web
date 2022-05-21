import { useTheme } from "@emotion/react";
import { Field } from "formik";
import React from "react";
import { useGetManufacturingCompanyMutation } from "../../services/phones";
import { useSearchPhonesOnlyMutation } from "../../services/search";
import SearchComponent from "../SearchComponent";
const FormikSearchComponent = ({
  fieldName,
  label,
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
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            setCompareItem={async (response) => {
              setFieldValue(fieldName, response);

              // not to do this request in question tab
              if (toGetManufacturingCompany) {
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
