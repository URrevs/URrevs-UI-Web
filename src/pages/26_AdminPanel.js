import { useTheme } from "@emotion/react";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import { Box, Grid, Modal, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CompetitionBody } from "../Components/CompetitionPrompt/CompetitionBody";
import { CompetitionPrompt } from "../Components/CompetitionPrompt/CompetitionPrompt";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ListItemNavigator from "../Components/Shared/ListItemNavigator";
import { PAPER_BORDER_RADIUS_DESKTOP } from "../constants";
import { convertDateToString } from "../functions/convertDateToString";
import ROUTES_NAMES from "../RoutesNames";
import { useGetLatestCompetetionQuery } from "../services/competetion";
import { useGetLastUpdateInfoQuery } from "../services/update";
import { useAppDispatch } from "../store/hooks";
import { snackbarActions } from "../store/uiSnackbarSlice";
import { UpdateProducts } from "./29_UpdateProducts";

export const AdminPanel = () => {
  const textContainer = useSelector((state) => state.language.textContainer);
  const language = useSelector((state) => state.language.language);
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const { data, isLoading } = useGetLastUpdateInfoQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const {
    data: lastCompetetionData,
    isLoading: lastCompetetionIsLoading,
    error: latestCompetetionError,
  } = useGetLatestCompetetionQuery();

  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // CLEAN CODE
  const pageDictionary = {
    adminPanel: textContainer.adminPanel,
    updateProductsList: textContainer.updateProductsList,
    addingCompetition: textContainer.addingCompetition,
    lastUpdatedIn: textContainer.lastUpdatedIn,
    theLastCompetitionTookPlaceIn: textContainer.theLastCompetitionTookPlaceIn,
    noCompetitionsYet: textContainer.noCompetitionsYet,
    noUpdateOperationsYet: textContainer.noUpdateOperationsYet,
  };
  const listItems = [
    {
      title: pageDictionary.updateProductsList,
      icon: <UpdateOutlinedIcon sx={{ fontSize: 40 }} />,
      subtitle: pageDictionary.lastUpdatedIn,
      to: theme.isMobile ? `../${ROUTES_NAMES.UPDATE}` : null,
      onClick: theme.isMobile
        ? null
        : () => {
            setPage(0);
          },
    },
    {
      title: pageDictionary.addingCompetition,
      icon: <EmojiEventsOutlinedIcon sx={{ fontSize: 40 }} />,
      subtitle: pageDictionary.theLastCompetitionTookPlaceIn,
      onClick: theme.isMobile
        ? handleOpen
        : () => {
            setPage(1);
          },
    },
  ];

  const [lastUpdateDate, setLastUpdateDate] = React.useState(
    pageDictionary.noUpdateOperationsYet
  );

  useEffect(() => {
    if (data) {
      setLastUpdateDate(convertDateToString(data.date, language));
    }
  }, [data]);

  const renderAdminOption = () =>
    isLoading || lastCompetetionIsLoading ? (
      <LoadingSpinner />
    ) : (
      <React.Fragment>
        <ListItemNavigator
          key={listItems[0].title}
          title={listItems[0].title}
          subTitle={
            lastUpdateDate &&
            listItems[0].subtitle +
              " " +
              convertDateToString(lastUpdateDate, language)
          }
          icon={listItems[0].icon}
          onClick={listItems[0].onClick}
          to={listItems[0].to}
        />
        <ListItemNavigator
          key={listItems[1].title}
          title={listItems[1].title}
          subTitle={
            latestCompetetionError &&
            latestCompetetionError.data.status === "not yet"
              ? textContainer.noCompetetionsYet
              : lastCompetetionData &&
                new Date(lastCompetetionData.deadline) - new Date() > 0
              ? textContainer.thereIsAnActiveCompetition
              : listItems[1].subtitle +
                " " +
                convertDateToString(
                  new Date(lastCompetetionData.createdAt),
                  language
                )
          }
          onClick={
            lastCompetetionData &&
            new Date(lastCompetetionData.deadline) - new Date() > 0
              ? () => {
                  dispatch(
                    snackbarActions.showSnackbar({
                      message: textContainer.thereACompetetionNow,
                    })
                  );
                }
              : listItems[1].onClick
          }
          icon={listItems[1].icon}
        />
      </React.Fragment>
    );
  const desktopView = () => (
    <Grid container>
      {/* Right Grid => On Arabic Language */}
      <Grid item xl={3} lg={3.5} md={4}>
        <Paper
          style={{
            padding: "65px 8px",
            height: "100vh",
            marginTop: "-65px",
            overflowY: "auto",
            position: "sticky",
            top: 0,
            borderRadius: PAPER_BORDER_RADIUS_DESKTOP,
          }}
        >
          <Typography variant="S22W700C050505">
            {pageDictionary.adminPanel + ":"}
          </Typography>
          {renderAdminOption()}
        </Paper>
      </Grid>
      {/* Remove the  page * 2 later it's just for show */}
      <Grid item xl={2} lg={1} md={0.5}></Grid>
      <Grid
        item
        xl={5}
        lg={6.5}
        md={7}
        sx={{
          marginTop: "39px",
          marginBottom: "65px",
        }}
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
      <Grid item xl={2} lg={1} md={0.5}></Grid>
    </Grid>
  );
  return (
    <React.Fragment>
      {theme.isMobile ? (
        <CustomAppBar showBackBtn showLabel label={pageDictionary.adminPanel}>
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
