import { useTheme } from "@emotion/react";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { CompetitionBanner } from "../Components/CompetitionBanner/CompetitionBanner";
import LeaderboardEntry from "../Components/Leaderboard/LeaderboardEntry";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { CARD_BORDER_RADIUS } from "../constants";
import { useAppSelector } from "../store/hooks";

export const Leaderboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const pageDictionary = {
    daysLeft: "15",
    prize: "Xiaomi Nokia F16",
    yourRank: "ترتيبك",
    userRanking: "ترتيب المستخدمين",
  };
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
      {arr.map((item, i) => (
        <Fragment>
          <LeaderboardEntry isBody userRank={i + 1} />
          <Divider></Divider>
        </Fragment>
      ))}
    </Paper>
  );
  return (
    <CustomAppBar showLabel showLogo showSearch showProfile>
      <div style={{ height: "14px" }}></div>
      <CompetitionBanner
        prize={pageDictionary.prize}
        daysLeft={pageDictionary.daysLeft}
      />

      {/* Your Rank In The Leaderboard */}
      <div style={{ height: "14px" }}></div>
      <Typography variant="S20W700C050505">
        {pageDictionary.yourRank + ": "}
      </Typography>
      <LeaderboardEntry />
      {/* List of users rank in leaderboard */}
      <div style={{ height: "14px" }}></div>
      <Typography variant="S20W700C050505">
        {pageDictionary.userRanking + ": "}
      </Typography>
      {leaderboardList()}
    </CustomAppBar>
  );
};
