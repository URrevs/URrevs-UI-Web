import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import { alpha, Button, Container } from "@mui/material";
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
  // display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  // margin: "4px 2px",
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
export const CompanyHorizontalList = () => {
  const theme = useTheme();

  const [selectedCompany, setSelectedCompany] = React.useState(null);

  const selectCompanyHandler = (index) => {
    setSelectedCompany(index);
  };

  let srcs = [
    "./images/logos/acer.png",
    "./images/logos/alcatel.jpg",
    "./images/logos/apple.jpg",
    "./images/logos/asus.png",
    "./images/logos/benq.jpg",
    "./images/logos/blackview.jpg",
    "./images/logos/blu.png",
    "./images/logos/bq.png",
    "./images/logos/casio.png",
    "./images/logos/cat.png",
    "./images/logos/celkon.png",
    "./images/logos/extractor.js",
    "./images/logos/fairphone.jpg",
    "./images/logos/garmin-asus.png",
    "./images/logos/gigabyte.png",
    "./images/logos/google.jpg",
    "./images/logos/htc.jpg",
    "./images/logos/huawei.jpg",
    "./images/logos/icemobile.png",
    "./images/logos/infinix.jpg",
    "./images/logos/intex.jpg",
    "./images/logos/lava.png",
    "./images/logos/lenovo.jpg",
    "./images/logos/maxwest.png",
    "./images/logos/microsoft.png",
    "./images/logos/mitac.png",
    "./images/logos/motorola.jpg",
    "./images/logos/nokia.jpg",
    "./images/logos/nvidia.png",
    "./images/logos/oppo.jpg",
    "./images/logos/orange.png",
    "./images/logos/panasonic.jpg",
    "./images/logos/pantech.jpg",
    "./images/logos/parla.jpg",
    "./images/logos/prestigio.jpg",
    "./images/logos/razer.png",
    "./images/logos/samsung.jpg",
    "./images/logos/sharp.png",
    "./images/logos/sony ericsson.png",
    "./images/logos/sony.jpg",
    "./images/logos/tcl.png",
    "./images/logos/tecno.png",
    "./images/logos/toshiba.png",
    "./images/logos/unnecto.jpg",
    "./images/logos/vodafone.png",
    "./images/logos/wiko.png",
    "./images/logos/xiaomi.jpg",
    "./images/logos/xolo.png",
    "./images/logos/yota.png",
    "./images/logos/zte.png",
  ];

  const listItem = (index) => {
    return (
      <CompanyButton
        key={index}
        onClick={selectCompanyHandler.bind(this, index)}
        backgroundColor={
          selectedCompany === index
            ? alpha(theme.palette.allProductsScreen.selectedItemBackground, 0.8)
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
              objectFit: "contain",
            }}
            src={srcs[index % srcs.length]}
          ></Avatar>
        </ListItemAvatar>
        <ListItemText
          sx={{ textAlign: "center" }}
          primaryTypographyProps={{ ...theme.typography.S16W400C050505 }}
          primary={srcs[index % srcs.length].substring(
            15,
            srcs[index % srcs.length].length - 4
          )}
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
