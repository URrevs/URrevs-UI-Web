import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
// eslint-disable-next-line no-unused-vars
const OrangeGradientButton = styled(LoadingButton, {
  shouldForwardProp: (prop) => prop !== "color",
})(({ color }) => ({
  background:
    color === "red"
      ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
      : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  border: 0,
  borderRadius: 16,
  boxShadow:
    color === "red"
      ? "0 3px 5px 2px rgba(255, 105, 135, .3)"
      : "0 3px 5px 2px rgba(33, 203, 243, .3)",
  color: "white",
  minHeight: 40,
  // width: "100%", why 100%?
  // padding: "0 30px", didn't need padding or margin
  // margin: "8px",
}));

export default OrangeGradientButton;
