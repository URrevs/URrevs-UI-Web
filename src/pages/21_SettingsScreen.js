import React from "react";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import LanguageIcon from "@mui/icons-material/Language";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ListItemNavigator from "../Components/Shared/ListItemNavigator";
import { useSelector } from "react-redux";
import { Box, List } from "@mui/material";

export const SettingsScreen = () => {
  const textContainer = useSelector((state) => state.language.textContainer);
  const language = useSelector((state) => state.language.language);

  const pageDictionary = {
    appbarLabel: "الاعدادات",
    language: "اللغة",
    color: "اللون",
    languageSub: language === "ar" ? "العربية" : "English",
    theme: "الابيض",
  };
  console.log(language);
  const listItems = [
    {
      title: pageDictionary.language,
      icon: <LanguageIcon sx={{ fontSize: 45 }} />,
      onClick: () => {},
      subTitle: pageDictionary.languageSub,
    },

    {
      title: pageDictionary.color,
      icon: <LightModeOutlinedIcon sx={{ fontSize: 45 }} />,
      onClick: () => {},
      subTitle: pageDictionary.theme,
    },
  ];
  const listItem = (title, subTitle, icon, to, onClick) => {
    return (
      <ListItemNavigator
        title={title}
        subTitle={subTitle}
        icon={icon}
        to={to}
        onClick={onClick}
      />
    );
  };
  return (
    <CustomAppBar showBackBtn showLabel label="الاعدادات">
      <List>
        <Box>
          {listItems.map((item, index) => (
            <div key={item.title + index}>
              {listItem(
                item.title,
                item.subTitle,
                item.icon,
                item.to,
                item.onClick
              )}
            </div>
          ))}
        </Box>
      </List>
    </CustomAppBar>
  );
};
