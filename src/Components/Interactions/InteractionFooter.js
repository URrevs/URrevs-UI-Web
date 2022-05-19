import { ButtonBase, styled, Typography } from "@mui/material";
import React from "react";
import { convertDateToString } from "../../functions/convertDateToString";
import { useCheckSignedIn } from "../../hooks/useCheckSignedIn";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

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
  ownerId,
}) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  const lang = useAppSelector((state) => state.language.language);
  const transDate = convertDateToString(date, lang);

  // get current user to chech if there's a user or not
  const currentUser = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const checkSignedIn = useCheckSignedIn;

  const handler = () => {
    onClickHandler();
  };
  
  return (
    <React.Fragment>
      <CommentButton onClick={handler}>
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
