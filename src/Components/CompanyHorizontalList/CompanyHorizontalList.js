import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import { Button, Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import classes from "./list.module.css";

const CompanyButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "backgroundColor",
})(({ theme, backgroundColor }) => ({
  textTransform: "none",
  variant: "contained",
  padding: 0,
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  margin: "4px 2px",
  padding: "4px 2px",
  borderRadius: 3,
  backgroundColor: backgroundColor,
  "&:hover": {
    backgroundColor:
      backgroundColor === "white"
        ? "#d9d9d9"
        : theme.palette.allProductsScreen.selectedItemBackground,
    boxShadow: "none",
  },
}));

// consider adding reducer for this state
export const CompanyHorizontalList = () => {
  const theme = useTheme();

  const [selectedCompany, setSelectedCompany] = React.useState(null);

  const selectCompanyHandler = (index) => {
    setSelectedCompany(index);
  };

  const listItem = (index) => {
    return (
      <CompanyButton
        key={index}
        onClick={selectCompanyHandler.bind(this, index)}
        backgroundColor={
          selectedCompany === index
            ? theme.palette.allProductsScreen.selectedItemBackground
            : "white"
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
            }}
          >
            <img
              objectFit="cover"
              width="45px"
              height="45px"
              src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Acer_Logo.svg"
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          sx={{ textAlign: "center" }}
          primaryTypographyProps={{ ...theme.typography.S16W400C050505 }}
          primary="oppo"
        />
      </CompanyButton>
    );
  };

  return (
    <List
      className={classes.list}
      sx={{
        bgcolor: "background.paper",
        overflowX: "scroll",
        display: "flex",
        margin: "0px",
        padding: "0px",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        boxShadow: 3,
      }}
    >
      {Array(40)
        .fill(0)
        .map((_, index) => listItem(index))}
    </List>
  );
};
