import { useTheme } from "@emotion/react";
import {
  Avatar,
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
import { PrizeDialog } from "../Components/Dialogs/PrizeDialog";
import LeaderboardEntry from "../Components/Leaderboard/LeaderboardEntry";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { CARD_BORDER_RADIUS } from "../constants";
import { subtractDate } from "../functions/subtractDate";
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

  console.log(latestCompetitionData);

  const theme = useTheme();
  const navigate = useNavigate();
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const [openPic, setOpenPic] = React.useState(false);
  const [openHowToWin, setOpenHowToWin] = React.useState(false);
  const handleCloseHowToWin = () => {
    setOpenHowToWin(false);
  };
  const handleOpenHowToWin = () => {
    setOpenHowToWin(true);
  };
  const handleClosePic = () => {
    setOpenPic(false);
  };
  const handleOpenPic = () => {
    setOpenPic(true);
  };
  const renderProduct = (title, imgSrc, to) => {
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
        <ListItemButton
          sx={{
            padding: 0,
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
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
            secondary={textContainer.smartphone}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  const leaderboardList = () => (
    <Fragment>
      <Typography variant="S20W700C050505">
        {"ترتيب المستخدمين" + ": "}
      </Typography>
      <Paper
        sx={{
          borderRadius: `${CARD_BORDER_RADIUS}px`,
        }}
      >
        {topUsersError ? (
          <div>Error</div>
        ) : topUsersIsLoading ? (
          <div>Loading...</div>
        ) : (
          topUsersData.map((item, i) => (
            <Fragment>
              <LeaderboardEntry
                isBody
                userRank={i + 1}
                userName={item.name}
                points={item.points}
                userPicture={item.picture}
                competitionData={latestCompetitionData}
                isWinner={
                  latestCompetitionData &&
                  latestCompetitionData.numWinners >= i + 1
                }
              />
              <Divider></Divider>
            </Fragment>
          ))
        )}
      </Paper>
    </Fragment>
  );

  console.log(latestCompetetionError);

  const competetionBanner = () => {
    if (latestCompetetionError) {
      if (latestCompetetionError.data.status != "not yet") {
        return <div>Error</div>;
      } else {
        if (latestCompetetionError.data.status === "not yet") {
          return <CompetitionBanner prize="" daysLeft="" />;
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
            <CompetitionBanner prize="" daysLeft="" />
            <Modal open={openPic}>
              <PrizeDialog
                prize={latestCompetitionData.prize}
                prizeImgSrc={latestCompetitionData.prizePic}
              />
            </Modal>
            <Modal open={openHowToWin}>
              <HowToWinDialog />
            </Modal>
          </div>
        );
      } else {
        return (
          <CompetitionBanner
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
          <Typography variant="S20W700C050505">{"ترتيبك" + ": "}</Typography>
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
              isWinner={true}
            />
          )}
        </div>
      )
    );
  };

  return (
    <CustomAppBar showLabel showLogo showSearch showProfile>
      <div style={{ height: "14px" }}></div>
      <div style={{ height: "14px" }}></div>

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
          <Grid item xl={2} lg={1} md={0.5}></Grid>

          <Grid item xl={5} lg={5} md={5.5}>
            {/* List of users rank in leaderboard */}

            {leaderboardList()}
          </Grid>

          <Grid item xl={1} lg={0} md={0.5}></Grid>
          <Grid item xl={4} lg={5} md={4.5}>
            <div style={{ position: "fixed", padding: "0 12px" }}>
              {/* competetion banner */}
              {competetionBanner()}
              {/* Your Rank In The Leaderboard */}
              {currentUserRank()}
            </div>
          </Grid>
        </Grid>
      )}
    </CustomAppBar>
  );
};
