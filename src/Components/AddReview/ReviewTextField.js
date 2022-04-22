import { Box, Typography, TextField } from "@mui/material";

const ReviewTextField = ({
  text,
  error = false,
  textSize = "h6",
  onFieldChange,
  onFieldBlur,
  fieldValue,
  fieldLabel,
}) => {
  return (
    <Box sx={{ flexGrow: "1" }}>
      <Typography variant={textSize} sx={{ pb: "5px" }}>
        {text}
      </Typography>
      <TextField
        sx={{ display: "flex", pb: "10px" }}
        variant="outlined"
        required
        error={error}
        multiline
        onChange={(e) => {
          onFieldChange(e.target.value);
        }}
        value={fieldValue}
        label={fieldLabel}
        onBlur={onFieldBlur}
      ></TextField>
    </Box>
  );
};
export default ReviewTextField;
