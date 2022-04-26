import { Avatar, Box, Button, Card, styled, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import React from "react";
const rtf2 = new Intl.RelativeTimeFormat("ar", { numeric: "auto" });
const ReplyButton = styled(
  Button,
  {}
)((theme) => ({
  margin: 0,
  padding: 0,
  lineHeight: 0,
  //   fontFamily: "Tajawal",
}));
const ReplyCard = styled(
  Card,
  {}
)(({ theme }) => ({
  display: "flex",
  position: "relative",
  flexDirection: "column",
  overflow: "unset",
  padding: "8px 12px",
  borderRadius: "12px",
  backgroundColor: theme.palette.commentCard.backgroundColor,
}));
export const Reply = ({ user, text, likes, date }) => {
  return (
    <div
      style={{
        marginLeft: "20px",
        marginTop: "28px",
        marginRight: "46px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Avatar
          sx={{ marginRight: "6px", height: "32px", width: "32px" }}
        ></Avatar>
        <Box>
          <ReplyCard>
            <Typography variant="S14W700C050505">{user}</Typography>
            <Typography variant="S14W400C000000">{text}</Typography>
            <Card
              sx={{
                padding: "0px 3px",
                minHeight: "15px",
                minWidth: "33px",
                borderRadius: "50px",
                position: "absolute",
                display: "flex",
                alignItems: "center",
                bottom: "-4px",
                right: "-15px",
              }}
            >
              <ThumbUpIcon
                sx={{
                  fontSize: "14px",
                  color: "#2196F3",
                }}
              />
              <div style={{ width: "3px" }}></div>
              <Typography variant="S14W400C050505">{likes}</Typography>
            </Card>
          </ReplyCard>

          <Box
            sx={{
              display: "flex",
              maxWidth: "224px",
              justifyContent: "space-around",
            }}
          >
            <ReplyButton>
              <Typography variant="S13W700C050505">إعجاب</Typography>
            </ReplyButton>
            <ReplyButton>
              <Typography variant="S13W700C050505">رد</Typography>
            </ReplyButton>
            <Typography variant="S13W400C65676B">
              {rtf2.format(date, "hour")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
