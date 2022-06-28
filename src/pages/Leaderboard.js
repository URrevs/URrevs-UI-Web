import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { CompetitionBanner } from "../Components/CompetitionBanner/CompetitionBanner";
import { HowToWinDialog } from "../Components/Dialogs/HowToWinDialog";
import { InvitationDialog } from "../Components/Dialogs/InvitationDialog";
import { PrizeDialog } from "../Components/Dialogs/PrizeDialog";
import LeaderboardEntry from "../Components/Leaderboard/LeaderboardEntry";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { CARD_BORDER_RADIUS } from "../constants";
import { subtractDate } from "../functions/subtractDate";
import ROUTES_NAMES from "../RoutesNames";
import {
  useGetLatestCompetetionQuery,
  useGetMyCurrentRankQuery,
  useGetTopCompetetionUsersQuery,
} from "../services/competetion";
import { useAppSelector } from "../store/hooks";

export const Leaderboard = () => {
  const currentUser = useAppSelector((state) => state.auth);

  const isMobile = useTheme().isMobile;
  const {
    data: myRankData,
    error: myRankError,
    isLoading: myRankIsLoading,
  } = useGetMyCurrentRankQuery({}, { skip: !currentUser.isLoggedIn });

  const {
    data: latestCompetitionData,
    error: latestCompetetionError,
    isLoading: latestCompetetionIsLoading,
  } = useGetLatestCompetetionQuery();

  const {
    data: topUsersData,
    error: topUsersError,
    isLoading: topUsersIsLoading,
  } = useGetTopCompetetionUsersQuery();

  // console.log(latestCompetitionData);

  const theme = useTheme();
  const navigate = useNavigate();
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const pageDictionary = {
    usersRanking: textContainer.usersRanking,
    yourRanking: textContainer.yourRanking,
  };
  const [modal, setModal] = React.useState("");
  const handleCloseDialog = () => {
    setModal("");
  };
  const ModalMananger = () => (
    <React.Fragment>
      <Modal
        open={modal === "howtowin"}
        onClose={handleCloseDialog}
        dir={theme.direction}
      >
        <Box>
          <HowToWinDialog handleClose={handleCloseDialog} />
        </Box>
      </Modal>
      <Modal
        open={modal === "prize"}
        onClose={handleCloseDialog}
        dir={theme.direction}
      >
        <Box>
          <PrizeDialog
            prize={latestCompetitionData?.prize}
            prizeImgSrc={latestCompetitionData?.prizePic}
            handleClose={handleCloseDialog}
          />
        </Box>
      </Modal>
      <Modal
        open={modal === "invitefriends"}
        onClose={handleCloseDialog}
        dir={theme.direction}
      >
        <Box>
          <InvitationDialog handleClose={handleCloseDialog} />
        </Box>
      </Modal>
    </React.Fragment>
  );
  console.log(myRankData);

  const renderEntry = () =>
    topUsersError ? (
      <div>Error</div>
    ) : topUsersIsLoading ? (
      <div>Loading...</div>
    ) : (
      topUsersData.map((item, i) => (
        <Fragment>
          <LeaderboardEntry
            isBody={theme.isMobile}
            userRank={i + 1}
            userName={item.name}
            points={item.points}
            userPicture={item.picture}
            userProfilePath={`/${ROUTES_NAMES.USER_PROFILE}?userId=${item._id}`}
            competitionData={latestCompetitionData}
            prizeClick={() => {
              setModal("prize");
            }}
            isWinner={
              latestCompetitionData && latestCompetitionData.numWinners >= i + 1
            }
          />
          {theme.isMobile ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Divider sx={{ width: "95%" }}></Divider>
            </div>
          ) : (
            <div style={{ height: "20px" }}></div>
          )}
        </Fragment>
      ))
    );
  const leaderboardList = () => (
    <Fragment>
      <Typography variant="S20W700C050505">
        {pageDictionary.usersRanking}
      </Typography>
      {theme.isMobile ? (
        <Paper
          sx={{
            borderRadius: `${CARD_BORDER_RADIUS}px`,
          }}
        >
          {renderEntry()}
        </Paper>
      ) : (
        renderEntry()
      )}
    </Fragment>
  );

  console.log(latestCompetetionError);

  const competetionBanner = () => {
    if (latestCompetetionError) {
      if (latestCompetetionError.data.status != "not yet") {
        return <div>Error</div>;
      } else {
        if (latestCompetetionError.data.status === "not yet") {
          return <CompetitionBanner setModal={setModal} prize="" daysLeft="" />;
        }
      }
    } else {
      if (latestCompetetionIsLoading) {
        return <div>Loading...</div>;
      } else if (
        latestCompetitionData &&
        new Date(latestCompetitionData.deadline) - new Date() < 0
      ) {
        return (
          <div>
            <CompetitionBanner setModal={setModal} prize="" daysLeft="" />
          </div>
        );
      } else {
        return (
          <CompetitionBanner
            setModal={setModal}
            prize={latestCompetitionData.prize}
            daysLeft={latestCompetitionData.deadline}
          />
        );
      }
    }
  };

  const currentUserRank = () => {
    return (
      currentUser.isLoggedIn && (
        <div>
          <div style={{ height: "14px" }}></div>
          <Typography variant="S20W700C050505">
            {pageDictionary.yourRanking}
          </Typography>
          {myRankError ? (
            <div>Error</div>
          ) : myRankIsLoading ? (
            <div>Loading...</div>
          ) : !myRankData ? (
            <Typography>login first</Typography>
          ) : (
            <LeaderboardEntry
              userName={myRankData.name}
              userRank={myRankData.rank}
              points={myRankData.points}
              userPicture={myRankData.picture}

              // isWinner={true}
            />
          )}
        </div>
      )
    );
  };

  return (
    <CustomAppBar showLabel showLogo showSearch showProfile>
      <div style={{ height: "14px" }}></div>

      {latestCompetetionError ? null : <ModalMananger />}
      {isMobile && (
        <div>
          {/* competetion banner */}
          {competetionBanner()}
          {/* Your Rank In The Leaderboard */}
          {currentUserRank()}
          {leaderboardList()}
        </div>
      )}
      {!isMobile && (
        <Grid container>
          <Grid item xl={2} lg={1.5} md={1}></Grid>

          <Grid item xl={5} lg={5} md={5}>
            {/* List of users rank in leaderboard */}

            {leaderboardList()}
          </Grid>

          <Grid item xl={0.5} lg={0.5} md={0.5}></Grid>
          <Grid
            style={{
              position: "relative",
            }}
            item
            xl={4}
            lg={4.5}
            md={4}
          >
            <div
              style={{
                position: "absolute",
                padding: "0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ height: "30px" }} />
              {/* competetion banner */}
              {competetionBanner()}
              {/* Your Rank In The Leaderboard */}
              {currentUserRank()}
            </div>
          </Grid>
          <Grid item xl={0.5} lg={0.5} md={1}></Grid>
        </Grid>
      )}
    </CustomAppBar>
  );
};
