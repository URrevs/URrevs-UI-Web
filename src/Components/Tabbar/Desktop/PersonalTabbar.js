import { Avatar, Box, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../store/hooks";
import StarWithCount from "../../Leaderboard/StarWithCount";
import { StickyTabbar } from "./StickyTabbar";

export const PersonalTabbar = ({
  userProfile,
  children,
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
  // const [smallPfpVisible, setSmallPfpVisible] = React.useState(false);
  // const observer = new IntersectionObserver(
  //   (entries) => {
  //     setSmallPfpVisible(!entries[0].isIntersecting);
  //   },
  //   { threshold: 1 }
  // );
  // const profileRef = React.useRef();
  // if (profileRef.current) observer.observe(profileRef.current);
  // console.log(profileRef.current);
  const userPhoto = (height, width) => (
    <Avatar
      src={userProfile.photo}
      alt="User profile picture"
      sx={{
        mr: "8px",
        height: `${height}px`,
        width: `${width}px`,
        transition: "0.1s",
      }}
    ></Avatar>
  );
  const userProfileFn = () => (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* User name and Profile Picture */}
      <Box style={{ display: "flex", alignItems: "flex-end" }}>
        {userPhoto(90, 90)}
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
      <Paper
        elevation={0}
        style={{
          padding: "0px 150px",
        }}
      >
        {userProfileFn()}
        <Divider />
      </Paper>

      <StickyTabbar userPhoto={userPhoto} />
      {children}
    </React.Fragment>
  );
};
