import React from "react";
import { styled, Button, Typography, ButtonBase } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
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
  date,
  buttonName,
  onClickHandler,
  condition,
  reply,
}) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  return (
    <React.Fragment>
      <CommentButton onClick={onClickHandler}>
        <Typography variant={condition ? "S13W700C2196F3" : "S13W700C050505"}>
          {buttonName}
        </Typography>
      </CommentButton>
      {!reply ? (
        <CommentButton sx={{ marginLeft:"8px"}}>
          <Typography variant={"S13W700C050505"}>
            {textContainer.reply}
          </Typography>
        </CommentButton>
      ) : null}
      <Typography sx={{ marginLeft: "16px" }} variant="S13W400C65676B">
        {date}
      </Typography>
    </React.Fragment>
  );
};
