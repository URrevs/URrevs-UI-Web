import { Avatar, Box, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../store/hooks";
import StarWithCount from "../../Leaderboard/StarWithCount";
import { Tabbar } from "../Tabbar";

export const PersonalTabbar = ({
  userProfile,
  arrayOfTabs = [],
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
      <Paper>
        {userProfileFn()}
        <Divider />
      </Paper>
      <Box
        style={{
          position: "sticky",
          top: 0,
        }}
      >
        <Tabbar
          value={value}
          setValue={setValue}
          isVertical={false}
          arrayOfTabs={arrayOfTabs}
        />
      </Box>
    </React.Fragment>
  );
};
