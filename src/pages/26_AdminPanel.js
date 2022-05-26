import { useTheme } from "@emotion/react";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import { Box, Modal, Paper, Typography, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CompetitionBody } from "../Components/CompetitionPrompt/CompetitionBody";

import { CompetitionPrompt } from "../Components/CompetitionPrompt/CompetitionPrompt";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ListItemNavigator from "../Components/Shared/ListItemNavigator";
import { PAPER_BORDER_RADIUS_DESKTOP } from "../constants";
import { convertDateToString } from "../functions/convertDateToString";
import ROUTES_NAMES from "../RoutesNames";
import { useGetLastUpdateInfoQuery } from "../services/update";
import { UpdateProducts } from "./29_UpdateProducts";

export const AdminPanel = () => {
  const textContainer = useSelector((state) => state.language.textContainer);
  const language = useSelector((state) => state.language.language);
  const navigate = useNavigate();
  const theme = useTheme();
  const { data, latestUpdateError, isLoading } = useGetLastUpdateInfoQuery();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
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
      to: theme.isMobile ? `../${ROUTES_NAMES.UPDATE}` : null,
      onClick: theme.isMobile
        ? null
        : () => {
            setPage(0);
          },
    },
    {
      title: pageDictionry.addingCompetition,
      icon: <EmojiEventsOutlinedIcon sx={{ fontSize: 40 }} />,
      subtitle: "اخر مسابقة تمت في",
      onClick: theme.isMobile
        ? handleOpen
        : () => {
            setPage(1);
          },
    },
  ];

  const [lastUpdateDate, setLastUpdateDate] =
    React.useState("لا يوجد تحديث بعد");

  useEffect(() => {
    if (data) {
      setLastUpdateDate(convertDateToString(data.lastUpdateDate, language));
    }
  }, [data]);
  const renderAdminOption = () =>
    isLoading ? (
      <LoadingSpinner />
    ) : (
      <React.Fragment>
        <ListItemNavigator
          key={listItems[0].title}
          title={listItems[0].title}
          subTitle={listItems[0].subtitle + " " + lastUpdateDate}
          icon={listItems[0].icon}
          onClick={listItems[0].onClick}
          to={listItems[0].to}
        />
        <ListItemNavigator
          key={listItems[1].title}
          title={listItems[1].title}
          subTitle={listItems[1].subtitle + " " + lastUpdateDate}
          onClick={listItems[1].onClick}
          icon={listItems[1].icon}
        />
      </React.Fragment>
    );
  const desktopView = () => (
    <Grid container>
      {/* Right Grid => On Arabic Language */}
      <Grid item lg={2.6}>
        <Paper
          style={{
            height: "100vh",
            overflowY: "auto",
            padding: "8px",
            borderRadius: PAPER_BORDER_RADIUS_DESKTOP,
          }}
        >
          <Typography variant="S22W700C050505">
            {pageDictionry.adminPanel + ":"}
          </Typography>
          {renderAdminOption()}
        </Paper>
      </Grid>
      {/* Remove the  page * 2 later it's just for show */}
      <Grid item lg={1.9}></Grid>

      <Grid
        sx={{
          marginTop: "39px",
        }}
        item
        lg={5.6 - page * 2}
      >
        {page === 0 ? (
          <UpdateProducts />
        ) : (
          <Paper
            sx={{
              padding: "20px 50px",
            }}
          >
            <Typography variant="S16W700C050505">
              {textContainer.addingCompetition}
            </Typography>
            <CompetitionBody />
          </Paper>
        )}
      </Grid>
      <Grid item lg={1.9}></Grid>
    </Grid>
  );
  return (
    <React.Fragment>
      {theme.isMobile ? (
        <CustomAppBar showBackBtn showLabel label={pageDictionry.adminPanel}>
          {renderAdminOption()}

          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                overflowY: "scroll",
              }}
            >
              <CompetitionPrompt handleClose={handleClose} />
            </Box>
          </Modal>
        </CustomAppBar>
      ) : (
        desktopView()
      )}
    </React.Fragment>
  );
};
