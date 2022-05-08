import { Card } from "@mui/material";
import { styled } from "@mui/styles";
import { CARD_BORDER_RADIUS } from "../constants";

const CardStyled = styled(
  Card,
  {}
)((theme) => ({
  borderRadius: `${CARD_BORDER_RADIUS}px`,
  marginBottom: "15px",
  padding: 0,
  display: "flex",
  justifyContent: "center",
}));
export default CardStyled;
