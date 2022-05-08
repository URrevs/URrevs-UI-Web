import { ButtonBase } from "@mui/material";
import { styled } from "@mui/styles";

const BasicButton = styled(
  ButtonBase,
  {}
)((theme) => ({
  padding: 0,
  lineHeight: 0,
  "& .MuiTypography-root": {
    fontFamily: "Tajawal",
  },
}));
export default BasicButton;
