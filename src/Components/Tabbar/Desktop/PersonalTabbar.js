import {
  Avatar,
  Box,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../store/hooks";
import StarWithCount from "../../Leaderboard/StarWithCount";

export const PersonalTabbar = ({
  userProfile,
  arrayOfTabs = [
    {
      value: 0,
      label: "Tab 1",
    },
    { value: 1, label: "Tab 2" },
    { value: 2, label: "Tab 3" },
  ],
  setValue,
  value,
}) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  userProfile = useAppSelector((state) => state.auth);
  const pageDictionry = {
    collectedStars: textContainer.collectedStars,
  };

  const userProfileFn = () => (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* User name and Profile Picture */}
      <Box style={{ display: "flex", alignItems: "flex-end" }}>
        {
          <Avatar
            src={userProfile.photo}
            alt="User profile picture"
            sx={{ mr: "8px", height: "90px", width: "90px" }}
          ></Avatar>
        }
        <Typography variant="S32W700C050505">{userProfile.name}</Typography>
      </Box>

      {/* Collected stars */}
      <Box style={{ display: "flex", alignItems: "flex-end" }}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="S20W400C65676B">
            {pageDictionry.collectedStars}
          </Typography>
          <div style={{ width: "12px" }}></div>
          <StarWithCount
            value={userProfile.points}
            starSize={34}
            textStyle="S20W400C65676B"
          />
        </Box>
      </Box>
    </Box>
  );

  return (
    <React.Fragment>
      <Paper elevation={0}>{userProfileFn()}</Paper>
      <Divider />
    </React.Fragment>
  );
};
