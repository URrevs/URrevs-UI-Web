import { useTheme } from "@emotion/react";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography
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
  useGetTopCompetetionUsersQuery
} from "../services/competetion";
import { useAppSelector } from "../store/hooks";

export const Leaderboard = () => {
  const currentUserApi = useAppSelector((state) => state.auth.uid);

  const {
    data: myRankData,
    error: myRankError,
    isLoading: myRankIsLoading,
  } = useGetMyCurrentRankQuery();

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

  const arr = new Array(10).fill(10);
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
            />
            <Divider></Divider>
          </Fragment>
        ))
      )}
    </Paper>
  );
  return (
    <CustomAppBar showLabel showLogo showSearch showProfile>
      <div style={{ height: "14px" }}></div>
      {latestCompetetionError ? (
        <div>Error</div>
      ) : latestCompetetionIsLoading ? (
        <div>Loading...</div>
      ) : (
        <CompetitionBanner
          prize={latestCompetetionData.prize}
          daysLeft={subtractDate(latestCompetetionData.deadline)}
        />
      )}

      {/* Your Rank In The Leaderboard */}
      <div style={{ height: "14px" }}></div>
      <Typography variant="S20W700C050505">{"ترتيبك" + ": "}</Typography>
      {myRankError ? (
        <div>Error</div>
      ) : myRankIsLoading ? (
        <div>Loading...</div>
      ) : (
        <LeaderboardEntry
          userName={myRankData.name}
          userRank={myRankData.rank}
          points={myRankData.points}
        />
      )}
      {/* List of users rank in leaderboard */}
      <div style={{ height: "14px" }}></div>
      <Typography variant="S20W700C050505">
        {"ترتيب المستخدمين" + ": "}
      </Typography>
      {leaderboardList()}
    </CustomAppBar>
  );
};
