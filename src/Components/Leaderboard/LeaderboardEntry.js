import { useTheme } from "@emotion/react";
import { Avatar, Card, styled, Typography } from "@mui/material";
import { Fragment } from "react";
import useFitText from "use-fit-text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { CARD_BORDER_RADIUS } from "../../constants";
import StarWithCount from "./StarWithCount";
import { useNavigate } from "react-router-dom";

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
  "&:hover": {
    backgroundColor: theme.palette.hover,
  },
  "&:active": {
    backgroundColor: theme.palette.hover,
  },
  "&:focus": {
    backgroundColor: theme.palette.hover,
  },
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
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { fontSize, ref } = useFitText({
    maxFontSize: 90,
  });
  const prizeIcon = isWinner ? (
    <div
      style={
        {
          // height: "40px",
          // width: "40px",
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          // display: "inline-block",
        }
      }
    >
      <FontAwesomeIcon
        icon={faGift}
        style={{
          height: "30px",
          width: "30px",
          color: "#FFBF00", //prize color
          // ".fa-gift:hover": {
          //   color: "#000", //prize color
          // },
          // backgroundColor: "#000 !important",
          // transition: "all 0.5s ease",
          // borderRadius: "50%",
          // cursor: "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation(); //Stop Bubbling
          prizeClick();
        }}
      />
    </div>
  ) : null;

  const entryBody = () => (
    <Fragment>
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
        <UserAvatar src={userPicture}></UserAvatar>
        <div style={{ width: "18px" }}></div>
        <Typography variant="S20W700C050505">{userName}</Typography>
      </div>

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
      onClick={() => {
        navigate(userProfilePath);
      }}
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
    <LeaderboardEntryCard
      onClick={() => {
        navigate(userProfilePath);
      }}
      elevation={3}
    >
      {entryBody()}
    </LeaderboardEntryCard>
  );
};

export default LeaderboardEntry;
