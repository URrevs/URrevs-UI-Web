import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import { Box, Modal } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CompetitionPrompt } from "../Components/CompetitionPrompt/CompetitionPrompt";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ListItemNavigator from "../Components/Shared/ListItemNavigator";
import { convertDateToString } from "../functions/convertDateToString";
import ROUTES_NAMES from "../RoutesNames";
import { useGetLastUpdateInfoQuery } from "../services/update";

export const AdminPanel = () => {
  const textContainer = useSelector((state) => state.language.textContainer);
  const language = useSelector((state) => state.language.language);
  const navigate = useNavigate();
  const { data, latestUpdateError, isLoading } = useGetLastUpdateInfoQuery();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // CLEAN CODE
  const pageDictionry = {
    adminPanel: textContainer.adminPanel,
    updateProductsList: textContainer.updateProductsList,
    addingCompetition: textContainer.addingCompetition,
  };
  const listItems = [
    {
      title: pageDictionry.updateProductsList,
      icon: <UpdateOutlinedIcon sx={{ fontSize: 40 }} />,
      subtitle: "اخر تحديث تم في",
      to: ROUTES_NAMES.UPDATE,
    },
    {
      title: pageDictionry.addingCompetition,
      icon: <EmojiEventsOutlinedIcon sx={{ fontSize: 40 }} />,
      subtitle: "اخر مسابقة تمت في",
      onClick: handleOpen,
    },
  ];

  const [lastUpdateDate, setLastUpdateDate] =
    React.useState("لا يوجد تحديث بعد");

  console.log(data);
  useEffect(() => {
    if (data) {
      setLastUpdateDate(convertDateToString(data.lastUpdateDate, language));
    }
  }, [data]);

  return (
    <CustomAppBar showBackBtn showLabel label={pageDictionry.adminPanel}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <React.Fragment>
          <ListItemNavigator
            key={listItems[0].title}
            title={listItems[0].title}
            subTitle={listItems[0].subtitle + " " + lastUpdateDate}
            icon={listItems[0].icon}
            to={listItems[0].to}
          />
          <ListItemNavigator
            key={listItems[1].title}
            title={listItems[1].title}
            subTitle={listItems[1].subtitle + " " + lastUpdateDate}
            onClick={() => {
              handleOpen();
            }}
            icon={listItems[1].icon}
          />
        </React.Fragment>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box>
          <CompetitionPrompt handleClose={handleClose} />
        </Box>
      </Modal>
    </CustomAppBar>
  );
};
