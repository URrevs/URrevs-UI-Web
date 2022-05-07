import { useTheme } from "@emotion/react";
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import SearchComponent from "../Components/SearchComponent";

export const SearchScreen = () => {
  const textContainer = useSelector((state) => state.language.textContainer);
  const pageDictionary = {
    search: textContainer.search,
    placeholder: textContainer.searchForAProductOrACompany,
    oldResults: textContainer.previousSearchResults,
    smartphone: textContainer.smartphone,
    company: textContainer.company,
  };
  const removeItem = (id) => {};
  const oldResults = [
    {
      title: "Nokia 7 plus",
      icon: <SmartphoneRoundedIcon sx={{ fontSize: 40 }} />,
      to: "",
      subtitle: pageDictionary.smartphone,
    },
    {
      title: "Nokia",
      icon: <BusinessOutlinedIcon sx={{ fontSize: 40 }} />,
      to: "",
      subtitle: pageDictionary.company,
    },
  ];
  const theme = useTheme();
  const renderListItem = (icon, title, subTitle) => (
    <React.Fragment>
      <ListItem sx={{ padding: 0, margin: 0, lineHeight: 0 }}>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ ...theme.typography.S20W700C050505 }}
            primary={title}
            secondaryTypographyProps={{ ...theme.typography.S18W400C65676B }}
            secondary={subTitle}
          />
        </ListItemButton>
        <IconButton onClick={removeItem}>
          <CloseOutlinedIcon
            sx={{ fontSize: "20px", color: theme.palette.cancel }}
          />
        </IconButton>
      </ListItem>
      {/* <div style={{ border: "0.2px solid #050505" }}></div> */}
      <Divider sx={{ padding: 0, color: theme.palette.divider }} />
    </React.Fragment>
  );

  return (
    <CustomAppBar showLabel label={pageDictionary.search} showBackBtn>
      <Box
        sx={{
          margin: "0px 13px",
        }}
      >
        <SearchComponent label={pageDictionary.placeholder}></SearchComponent>
        <Box sx={{ margin: "16px 12px" }}>
          <Typography variant="S16W500C65676b">
            {pageDictionary.oldResults}
          </Typography>
          <List>
            {oldResults.map((item) =>
              renderListItem(item.icon, item.title, item.subtitle)
            )}
          </List>
        </Box>
      </Box>
    </CustomAppBar>
  );
};
