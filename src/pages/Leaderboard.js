import { useTheme } from "@emotion/react";
import { Box, Divider, Grid, Modal, Paper, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { CompetitionBanner } from "../Components/CompetitionBanner/CompetitionBanner";
import { HowToWinDialog } from "../Components/Dialogs/HowToWinDialog";
import { InvitationDialog } from "../Components/Dialogs/InvitationDialog";
import { PrizeDialog } from "../Components/Dialogs/PrizeDialog";
import LeaderboardEntry from "../Components/Leaderboard/LeaderboardEntry";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { CARD_BORDER_RADIUS } from "../constants";
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

  const theme = useTheme();

  const textContainer = useAppSelector((state) => state.language.textContainer);
  const pageDictionary = {
    usersRanking: textContainer.usersRanking,
    yourRanking: textContainer.yourRanking,
    usersRankingInCurrentCompetetion:
      textContainer.usersRankingInCurrentCompetetion,
  };
  const [modal, setModal] = React.useState("");
  const handleCloseDialog = () => {
    setModal("");
  };
  // useEffect(() => {
  //   const counter = setInterval();
  //   return () => {
  //     clearInterval(counter);
  //   };
  // }, []);
  const [isCurrentlyHeld, setIsCurrentlyHeld] = useState(false);
  useEffect(() => {
    if (
      latestCompetitionData &&
      new Date(latestCompetitionData.deadline) - new Date() > 0
    ) {
      setIsCurrentlyHeld(true);
    } else {
      setIsCurrentlyHeld(false);
    }
  }, [latestCompetitionData]);

  const ModalMananger = () => (
    <React.Fragment>
      <Modal
        open={modal === "howtowin"}
        onClose={handleCloseDialog}
        dir={theme.direction}
      >
        <Box>
          <HowToWinDialog
            handleClose={handleCloseDialog}
            isCurrentlyHeld={isCurrentlyHeld}
          />
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

  const renderEntry = () =>
    topUsersError ? (
      <div>Error</div>
    ) : topUsersIsLoading ? (
      <LoadingSpinner />
    ) : (
      topUsersData.map((item, i) => (
        <Fragment key={item.name + i}>
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
              isCurrentlyHeld
                ? latestCompetitionData &&
                  latestCompetitionData.numWinners >= i + 1
                : false
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
        {latestCompetitionData && isCurrentlyHeld
          ? pageDictionary.usersRankingInCurrentCompetetion
          : pageDictionary.usersRanking}
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

  const competetionBanner = () => {
    if (latestCompetetionError) {
      if (latestCompetetionError.data.status !== "not yet") {
        return <div>Error</div>;
      } else {
        if (latestCompetetionError.data.status === "not yet") {
          return <CompetitionBanner setModal={setModal} prize="" daysLeft="" />;
        }
      }
    } else {
      if (latestCompetetionIsLoading) {
        return <LoadingSpinner />;
      } else if (!isCurrentlyHeld) {
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
            <LoadingSpinner />
          ) : !myRankData ? (
            <Typography>login first</Typography>
          ) : (
            <LeaderboardEntry
              userName={myRankData.name}
              userRank={myRankData.rank}
              points={myRankData.points}
              userPicture={myRankData.picture}
              isSameUser={false}
              isWinner={
                isCurrentlyHeld
                  ? latestCompetitionData &&
                    latestCompetitionData.numWinners >= myRankData.rank + 1
                  : false
              }
            />
          )}
        </div>
      )
    );
  };

  return (
    <CustomAppBar showLabel showLogo showSearch showProfile>
      <div style={{ height: "14px" }}></div>

      <ModalMananger />
      {isMobile && (
        <div>
          {/* competetion banner */}
          {competetionBanner()}
          {/* Your Rank In The Leaderboard */}
          {currentUserRank()}
          <div style={{ height: "16px" }}></div>
          {leaderboardList()}
        </div>
      )}
      {!isMobile && (
        <Grid container>
          <Grid item xl={2} lg={1} sm={0.5}></Grid>

          <Grid item xl={5} lg={5} sm={5.5}>
            {/* List of users rank in leaderboard */}

            {leaderboardList()}
          </Grid>

          <Grid item xl={0.5} lg={0.5} sm={0.25}></Grid>
          <Grid
            style={{
              position: "relative",
            }}
            item
            xl={4}
            lg={5}
            sm={5.5}
          >
            <div
              style={{
                position: "absolute",
                padding: "0px",
                display: "flex",
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
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
          <Grid item xl={0.5} lg={0.5} sm={0.25}></Grid>
        </Grid>
      )}
    </CustomAppBar>
  );
};
