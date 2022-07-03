import { useField } from "formik";
export const FastFormikTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input {...field} {...props} autoComplete="off" />
    </div>
  );
};
