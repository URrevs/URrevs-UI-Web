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
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
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
 
  const pageDictionary = {};
  return (
    <React.Fragment>
      <CustomAppBar showLogo showSearch showProfile />

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
