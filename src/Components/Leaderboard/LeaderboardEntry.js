import { useTheme } from "@emotion/react";
import { Avatar, Card, styled, Typography } from "@mui/material";
import { Fragment } from "react";
import useFitText from "use-fit-text";
import { CARD_BORDER_RADIUS } from "../../constants";
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
  userName = "John Do",
  isBody = false,
}) => {
  const theme = useTheme();

  const { fontSize, ref } = useFitText({
    maxFontSize: 90,
  });
  const leaderboardBody = () => (
    <Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
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
        <UserAvatar></UserAvatar>
        <div style={{ width: "18px" }}></div>
        <Typography variant="S20W700C050505">{userName}</Typography>
      </div>
      <StarWithCount value={40000} starSize={38} textStyle="S20W400C65676B" />
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
      {leaderboardBody()}
    </div>
  ) : (
    <LeaderboardEntryCard>{leaderboardBody()}</LeaderboardEntryCard>
  );
};

export default LeaderboardEntry;
