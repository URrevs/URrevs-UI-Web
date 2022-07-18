import { useTheme } from "@emotion/react";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Card, IconButton, styled, Typography } from "@mui/material";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFitText from "use-fit-text";
import StarWithCount from "./StarWithCount";

const LeaderboardEntryCard = styled(
  Card,
  {}
)(({ theme }) => ({
  backgroundColor: theme.palette.leaderBoard.entryCard,
  minHeight: 60,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0px 12px",
  borderRadius: "12px",
  cursor: "pointer",
  // "&:hover": {
  //   backgroundColor: theme.palette.hover,
  // },
  // "&:active": {
  //   backgroundColor: theme.palette.hover,
  // },
  // "&:focus": {
  //   backgroundColor: theme.palette.hover,
  // },
  transition: "all 0.8s ease",
}));

const RankCircle = styled(
  Avatar,
  {}
)(({ theme }) => ({
  backgroundColor: theme.palette.leaderBoard.rankCircle,
  height: 35,
  width: 35,
}));

const UserAvatar = styled(
  Avatar,
  {}
)(({ theme }) => ({
  width: 40,
  height: 40,
}));

const LeaderboardEntry = ({
  userRank = 1,
  userName = "",
  userPicture,
  userProfilePath = "",
  isBody = false,
  points = 0,
  prizeClick = () => {},
  isWinner = false,
  isSameUser = false,
}) => {
  const theme = useTheme();

  const { fontSize, ref } = useFitText({
    maxFontSize: 90,
  });

  const prizeIcon = isWinner ? (
    <IconButton
      onClick={(e) => {
        e.stopPropagation(); //Stop Bubbling
        prizeClick();
      }}
    >
      <FontAwesomeIcon
        icon={faGift}
        className="fann"
        style={{
          height: "30px",
          width: "30px",
          color: "#FFBF00", //prize color
          "fann:hover .fa-gift": {
            color: "#000", //prize color
          },
          backgroundColor: "#000 !important",
          transition: "all 0.5s ease",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      />
    </IconButton>
  ) : null;

  const entryBody = () => (
    <Fragment>
      <Link
        style={{
          width: "100%",

          textDecoration: "none",
        }}
        to={userProfilePath}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
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
          <RankCircle>
            <div
              ref={ref}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...theme.typography.S18W700C050505,
                fontSize,
                width: 30,
                height: 30,
              }}
            >
              {userRank}
            </div>
          </RankCircle>
          <div style={{ width: "18px" }}></div>
          <UserAvatar alt="user picture" src={userPicture}>
            <Avatar />
          </UserAvatar>
          <div style={{ width: "18px" }}></div>
          <Typography variant="S20W700C050505">{userName}</Typography>
        </div>
      </Link>

      <StarWithCount
        value={points}
        starSize={38}
        textStyle="S20W400C65676B"
        prizeIcon={prizeIcon}
        // isWinner={isWinner}
      />
    </Fragment>
  );
  return isBody ? (
    <div
      style={{
        // backgroundColor: theme.palette.leaderBoard.entryCard,
        minHeight: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 12px",
      }}
    >
      {entryBody()}
    </div>
  ) : (
    <LeaderboardEntryCard elevation={3}>{entryBody()}</LeaderboardEntryCard>
  );
};

export default LeaderboardEntry;
