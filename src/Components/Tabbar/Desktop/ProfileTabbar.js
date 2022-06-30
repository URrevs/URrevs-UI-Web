import { useTheme } from "@emotion/react";
import { Avatar, Box, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useGetOtherUserProfileQuery } from "../../../services/users";
import { useAppSelector } from "../../../store/hooks";
import StarWithCount from "../../Leaderboard/StarWithCount";
import { StickyTabbar } from "./StickyTabbar";

export const ProfileTabbar = ({ children, arrayOfTabs }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const uid = searchParams.get("userId");

  const storeUser = useAppSelector((state) => state.auth);

  const {
    data: userProfile,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetOtherUserProfileQuery(uid);

  // userProfile = useAppSelector((state) => state.auth);
  const pageDictionry = {
    collectedStars: textContainer.collectedStars,
  };
  const [smallPfpVisible, setSmallPfpVisible] = React.useState(false);

  // const observer = new IntersectionObserver(
  //   (entries) => {
  //     setSmallPfpVisible(!entries[0].isIntersecting);
  //   },
  //   { threshold: 1 }
  // );
  // const profileRef = React.useRef();
  // if (profileRef.current) observer.observe(profileRef.current);
  // console.log(profileRef.current);

  const userProfileFn = () => (
    <Box
      style={{
        display: "flex",
        maxHeight: "90px",
        justifyContent: "space-between",
      }}
    >
      {/* User name and Profile Picture */}
      <Box style={{ display: "flex", alignItems: "flex-end" }}>
        <Avatar
          src={userProfile.photo}
          alt="User profile picture"
          sx={{
            mr: "8px",
            height: `90px`,
            width: `90px`,
            transition: "0.1s",
          }}
        />
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

  return userProfile ? (
    <React.Fragment>
      <div
      // style={{
      //   height: "100%",
      // }}
      >
        <Paper
          // profileRef={profileRef}
          elevation={0}
          sx={{
            padding: "0px 200px", //Above XL
            [theme.breakpoints.down("xl")]: {
              padding: "0px 150px",
            },
            [theme.breakpoints.down("lg")]: {
              padding: "0px 50px",
            },
          }}
        >
          {userProfileFn()}
          <Divider />
        </Paper>

        <StickyTabbar
          userPhoto={userProfile.photo}
          smallPfpVisible={smallPfpVisible}
          userName={userProfile.name}
          arrayOfTabs={arrayOfTabs}
        />
        {children}
      </div>
    </React.Fragment>
  ) : (
    <div>Loading...</div>
  );
};
