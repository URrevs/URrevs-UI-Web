import { useFormikContext } from "formik";
import React from "react";

export const ScrollIntoView = () => {
  const { errors, isSubmitting, isValidating } = useFormikContext();

  React.useEffect(() => {
    if (isSubmitting && !isValidating) {
      let keys = Object.keys(errors);
      if (keys.length > 0) {
        const selector = `[name=${keys[0]}]`;
        const errorElement = document.querySelector(selector);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
          errorElement.focus({ preventScroll: true });
        }
      }
    }
  }, [errors, isSubmitting, isValidating]);

  return null;
};
