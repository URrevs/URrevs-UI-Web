import React from "react";
import { styled, Button, Typography, ButtonBase } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { convertDateToString } from "../../functions/convertDateToString";
const CommentButton = styled(
  ButtonBase,
  {}
)((theme) => ({
  marginRight: "8px",
  padding: 0,
  lineHeight: 0,
  ".MuiTypography-root": {
    fontFamily: "Tajawal",
  },
}));

export const InteractionFooter = ({
  commentId,
  date,
  buttonName,
  onClickHandler,
  condition,
  reply,
  commentLike,
  commentUnlike,
}) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  const lang = useAppSelector((state) => state.language.language);
  const transDate = convertDateToString(date, lang);

  return (
    <React.Fragment>
      <CommentButton
        onClick={
          condition
            ? commentUnlike.bind(null, commentId)
            : commentLike.bind(null, commentId)
        }
      >
        <Typography variant={condition ? "S13W700C2196F3" : "S13W700C050505"}>
          {buttonName}
        </Typography>
      </CommentButton>
      {!reply ? (
        <CommentButton sx={{ marginLeft: "8px" }}>
          <Typography variant={"S13W700C050505"}>
            {textContainer.reply}
          </Typography>
        </CommentButton>
      ) : null}
      <Typography sx={{ marginLeft: "16px" }} variant="S13W400C65676B">
        {transDate}
      </Typography>
    </React.Fragment>
  );
};
