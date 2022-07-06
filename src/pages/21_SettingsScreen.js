import { useTheme } from "@emotion/react";
import LanguageIcon from "@mui/icons-material/Language";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { Box, List, Modal } from "@mui/material";
import React from "react";
import { LanguageDialog } from "../Components/Dialogs/LanguageDialog";
import { ThemeDialog } from "../Components/Dialogs/ThemeDialog";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ListItemNavigator from "../Components/Shared/ListItemNavigator";
import { useAppSelector } from "../store/hooks";

export const SettingsScreen = ({ isDesktop = false, setSettingsSlide }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const language = useAppSelector((state) => state.language.language);
  const isDark = useAppSelector((state) => state.darkMode.isDark);
  const theme = useTheme();
  const [modal, setModal] = React.useState("");
  const handleClose = () => {
    setModal("");
  };
  const pageDictionary = {
    appbarLabel: textContainer.settings,
    language: textContainer.language,
    color: textContainer.theme,
    languageSub: language === "ar" ? "العربية" : "English",
    theme: isDark ? textContainer.darkTheme : textContainer.lightTheme,
  };
  //window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  //use this to check if the current browser theme is dark.
  const listItems = [
    {
      title: pageDictionary.language,
      icon: <LanguageIcon sx={{ fontSize: 45 }} />,
      onClick: () => {
        setModal("language");
      },
      subTitle: pageDictionary.languageSub,
    },

    {
      title: pageDictionary.color,
      icon: <LightModeOutlinedIcon sx={{ fontSize: 45 }} />,
      onClick: () => {
        setModal("theme");
      },
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
  const ModalMananger = () => (
    <div>
      <Modal
        open={modal === "language"}
        direction={theme.direction}
        onClose={handleClose}
      >
        <div>
          <LanguageDialog handleClose={handleClose} />
        </div>
      </Modal>
      <Modal
        open={modal === "theme"}
        direction={theme.direction}
        onClose={handleClose}
      >
        <div>
          <ThemeDialog handleClose={handleClose} />
        </div>
      </Modal>
    </div>
  );

  return (
    <React.Fragment>
      <ModalMananger />
      {isDesktop ? null : (
        <CustomAppBar
          showBackBtn
          showLabel
          label={pageDictionary.appbarLabel}
        />
      )}
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
    </React.Fragment>
  );
};
