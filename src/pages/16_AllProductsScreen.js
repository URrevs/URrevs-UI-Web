import { useTheme } from "@emotion/react";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CompanyHorizontalList } from "../Components/CompanyHorizontalList/CompanyHorizontalList";
import ListItemNavigator from "../Components/Shared/ListItemNavigator";

export const AllProductsScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const textContainer = useSelector((state) => state.language.textContainer);
  //Fetch All products in this array
  const arrayOfAllProducts = [
    {
      name: "Xiaomi Redmi Note 5",
      avatar: "",
      subtitle: "هاتف ذكي",
    },
    {
      name: "Oppo Reno 6",
      avatar: "",
      subtitle: "هاتف ذكي",
    },
    {
      name: "Xiaomi Redmi S2",
      avatar: "",
      subtitle: "هاتف ذكي",
    },
    {
      name: "Oppo Reno 5",
      avatar: "",
      subtitle: "هاتف ذكي",
    },
    {
      name: "Xiaomi Redmi Note 4",
      avatar: "",
      subtitle: "هاتف ذكي",
    },
    {
      name: "Nokia 7 plus",
      avatar: "",
      subtitle: "هاتف ذكي",
    },
    {
      name: "Samsung Note 5",
      avatar: "",
      subtitle: "هاتف ذكي",
    },
    {
      name: "Huawei nova 9",
      avatar: "",
      subtitle: "هاتف ذكي",
    },
  ];
  const renderProduct = (title, subtitle, imgSrc, to) => {
    return (
      <ListItem
        onClick={() => {
          navigate(to);
        }}
        disablePadding
        dense
        key={title}
        style={{
          "&:hover": {
            backgroundColor: theme.palette.hover,
          },
          "&:active": {
            backgroundColor: theme.palette.hover,
          },
          "&:focus": {
            backgroundColor: theme.palette.hover,
          },
        }}
      >
        <ListItemButton sx={{ padding: 0 }}>
          <Avatar
            sx={{
              margin: "18px 17px 10px 13px",
            }}
          >
            <img
              alt=""
              objectfit="cover"
              width="40px"
              height="40px"
              src={imgSrc}
            />
          </Avatar>
          <ListItemText
            primaryTypographyProps={{
              ...theme.typography.S20W700C050505,
              lineHeight: 1,
            }}
            primary={title}
            secondaryTypographyProps={{ ...theme.typography.S16W400C65676B }}
            secondary={subtitle}
          />
        </ListItemButton>
      </ListItem>
    );
  };
  const pageDictionary = {};
  return (
    <React.Fragment>
      <CompanyHorizontalList />
      <List>
        {arrayOfAllProducts.map((item) => (
          <React.Fragment>
            {renderProduct(item.name, item.subtitle, item.avatar, "")}
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </React.Fragment>
  );
};
