import React from "react";
import { styled, Button, Typography } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
const CommentButton = styled(
  Button,
  {}
)((theme) => ({
  margin: 0,
  padding: 0,
  lineHeight: 0,
}));

export const InteractionFooter = ({
  date,
  buttonName,
  onClickHandler,
  condition,
  reply,
}) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  return (
    <div>
      <CommentButton onClick={onClickHandler}>
        <Typography variant={condition ? "S13W700C2196F3" : "S13W700C050505"}>
          {buttonName}
        </Typography>
      </CommentButton>
      {!reply ? (
        <CommentButton>
          <Typography variant={"S13W700C050505"}>{textContainer.reply}</Typography>
        </CommentButton>
      ) : null}
      <Typography variant="S13W400C65676B">{date}</Typography>
    </div>
  );
};
