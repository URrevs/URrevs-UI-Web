import { useTheme } from "@emotion/react";
import LanguageIcon from "@mui/icons-material/Language";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeIconOutlined from "@mui/icons-material/DarkModeOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, List, Modal, Stack } from "@mui/material";
import React from "react";
import { LanguageDialog } from "../Components/Dialogs/LanguageDialog";
import { ThemeDialog } from "../Components/Dialogs/ThemeDialog";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ListItemNavigator from "../Components/Shared/ListItemNavigator";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  useDeleteAccountMutation,
  useUndoDeleteRequestMutation,
} from "../services/misc.tsx";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { confirmationActions } from "../store/uiConfirmationModalSlice";
import { ConfirmationBody } from "../Components/Dialogs/ConfiramtionBody";

export const SettingsScreen = ({ isDesktop = false, setSettingsSlide }) => {
  const dispatch = useAppDispatch();
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const language = useAppSelector((state) => state.language.language);
  const isDark = useAppSelector((state) => state.darkMode.isDark);
  const delReq = useAppSelector((state) => state.auth.requestedDelete);
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
    delete: textContainer.deleteAccount,
    cancelDel: textContainer.cancelDeleteAccountRequest,
    conTitle: textContainer.areYouSure,
    conWarningText:
      textContainer.thisWillCauseYourAccountToBeErasedAndYouWillNotBeAbleToRecoverItAgain,
  };
  //RTK
  const [deleteAccount, { isLoading: sendingDeleteReq }] =
    useDeleteAccountMutation();
  const [undoDeleteRequest, { isLoading: sendingUndoReq }] =
    useUndoDeleteRequestMutation();
  //ConfirmationModal args
  const yesAction = delReq ? undoDeleteRequest : deleteAccount;
  const noAction = () => {
    setModal("");
  };
  //window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  //use this to check if the current browser theme is dark.
  const listItems = [
    {
      title: pageDictionary.language,
      icon: (
        <LanguageIcon sx={{ fontSize: 45, color: theme.palette.iconColor }} />
      ),
      onClick: () => {
        setModal("language");
      },
      subTitle: pageDictionary.languageSub,
    },

    {
      title: pageDictionary.color,
      icon: isDark ? (
        <DarkModeIconOutlined
          sx={{ fontSize: 45, color: theme.palette.iconColor }}
        />
      ) : (
        <LightModeOutlinedIcon
          sx={{ fontSize: 45, color: theme.palette.iconColor }}
        />
      ),
      onClick: () => {
        setModal("theme");
      },
      subTitle: pageDictionary.theme,
    },
    {
      title: !(sendingDeleteReq || sendingUndoReq)
        ? delReq
          ? pageDictionary.cancelDel
          : pageDictionary.delete
        : "",
      icon: !(sendingDeleteReq || sendingUndoReq) ? (
        delReq ? (
          <CancelIcon
            htmlColor={theme.palette.iconColor}
            sx={{ fontSize: 45 }}
          />
        ) : (
          <DeleteForeverIcon
            htmlColor={theme.colors.ce41d1d}
            sx={{ fontSize: 45 }}
          />
        )
      ) : (
        <LoadingSpinner
          sx={{
            fontSize: 50,
            backgroundColor: delReq
              ? theme.colors.ce41d1d
              : theme.palette.iconColor,
          }}
        />
      ),
      subTitle: "",
      onClick: () => {
        if (!delReq) setModal("confirmation");
        else yesAction();
      },
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
      <Modal
        open={modal === "confirmation"}
        direction={theme.direction}
        onClose={handleClose}
      >
        <div style={{ direction: theme.direction }}>
          <ConfirmationBody
            title={pageDictionary.conTitle}
            warningText={pageDictionary.conWarningText}
            yesAction={() => {
              yesAction();
              noAction();
            }}
            noAction={noAction}
          />
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
        <Stack spacing={1}>
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
        </Stack>
      </List>
    </React.Fragment>
  );
};
