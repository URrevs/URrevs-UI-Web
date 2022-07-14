import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { alpha } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import classes from "./list.module.css";

const CompanyButton = styled("div", {
  shouldForwardProp: (prop) => prop != "backgroundColor",
})(({ theme, backgroundColor }) => ({
  textTransform: "none",
  variant: "contained",
  padding: 0,
  alignItems: "center",
  whiteSpace: "nowrap",
  margin: "0px 2px",
  padding: "4px 2px",
  borderRadius: 10,
  backgroundColor: backgroundColor,

  "&:hover": {
    backgroundColor:
      backgroundColor === "white"
        ? theme.palette.allProductsScreen.brandHover
        : theme.palette.allProductsScreen.selectedItemBackground,
    boxShadow: "none",
  },
}));

// consider adding reducer for this state
export const CompanyHorizontalList = ({
  selectCompanyHandler,
  selectedCompany,
  companiesList,
}) => {
  const theme = useTheme();

  const listItem = (title, imgSrc, index, id) => {
    return (
      <CompanyButton
        key={index}
        onClick={selectCompanyHandler.bind(this, index, id)}
        backgroundColor={
          selectedCompany.index === index
            ? alpha(theme.palette.allProductsScreen.selectedItemBackground, 0.8)
            : theme.palette.interactionCard.backgroundMobileColor
        }
      >
        <ListItemAvatar
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Avatar
            sx={{
              width: "50px",
              height: "50px",
              objectFit: "contain",
            }}
            src={imgSrc}
          ></Avatar>
        </ListItemAvatar>
        <ListItemText
          sx={{ textAlign: "center" }}
          primaryTypographyProps={{ ...theme.typography.S16W400C050505 }}
          primary={title}
        />
      </CompanyButton>
    );
  };

  return (
    <List
      className={classes.list}
      sx={{
        bgcolor: theme.palette.interactionCard.backgroundMobileColor,
        overflowX: "scroll",
        display: "flex",
        margin: "0px",
        padding: "0px",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        boxShadow: 3,
      }}
    >
      {companiesList.map((item, index) =>
        listItem(item.name, item.logo, index, item._id)
      )}
    </List>
  );
};
