import { useTheme } from "@emotion/react";
import {
  Avatar,
  Divider,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { CompetitionBanner } from "../Components/CompetitionBanner/CompetitionBanner";
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
    data: latestCompetetionData,
    error: latestCompetetionError,
    isLoading: latestCompetetionIsLoading,
  } = useGetLatestCompetetionQuery();

  const {
    data: topUsersData,
    error: topUsersError,
    isLoading: topUsersIsLoading,
  } = useGetTopCompetetionUsersQuery();

  const theme = useTheme();
  const navigate = useNavigate();
  const textContainer = useAppSelector((state) => state.language.textContainer);

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
                isWinner={
                  latestCompetetionData &&
                  latestCompetetionData.numWinners >= i + 1
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
        latestCompetetionData &&
        new Date(latestCompetetionData.deadline) - new Date() < 0
      ) {
        return <CompetitionBanner prize="" daysLeft="" />;
      } else {
        return (
          <CompetitionBanner
            prize={latestCompetetionData.prize}
            daysLeft={latestCompetetionData.deadline}
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
