import { styled } from "@mui/material";
import { default as MUICard } from "@mui/material/Card";

const StyledCard = styled(
  MUICard,
  {}
)(({ theme }) => ({
  margin: "10px 18px",
  padding: "0",
  borderRadius: "10px",
  backgroundColor: theme.palette.reviewCard.reviewCardColor,
  boxShadow:
    "0px 4px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);",
}));

const Cardm = (props) => {
  return <StyledCard>{props.children}</StyledCard>;
};

export default Cardm;
