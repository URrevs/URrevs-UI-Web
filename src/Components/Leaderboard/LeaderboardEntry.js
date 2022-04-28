import { useTheme } from "@emotion/react";
import { Avatar, Card, styled, Typography } from "@mui/material";
import useFitText from "use-fit-text";
import { useConvertNumberToHumanLanguage } from "../../hooks/useMillify";
import Star from "../Icons/star";

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

const LeaderboardEntry = (props) => {
  const theme = useTheme();

  const { fontSize, ref } = useFitText({
    maxFontSize: 90,
  });
  const userRank = 1;
  const userName = "John Do";

  return (
    <LeaderboardEntryCard>
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

      <div style={{ display: "flex", alignItems: "center" }}>
        <Star color={theme.palette.reviewCard.filledStarColor} size="38" />
        <Typography variant="S20W400C050505">
          {useConvertNumberToHumanLanguage(40000)}
        </Typography>
      </div>
    </LeaderboardEntryCard>
  );
};

export default LeaderboardEntry;
