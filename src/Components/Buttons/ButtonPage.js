import { ButtonBase } from "@mui/material";
import { styled } from "@mui/styles";

const ButtonPage = styled(
  ButtonBase,
  {}
)((theme) => ({
  padding: "12px 6px",
  lineHeight: 0,
  borderRadius: "16px",
  "& .MuiTypography-root": {
    fontFamily: "Tajawal",
  },
}));
export default ButtonPage;
