import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { InteractionBody } from "./InteractionBody";
import { useTheme } from "@emotion/react";
import { InteractionFooter } from "./InteractionFooter";
import { useAppSelector } from "../../store/hooks";

export const CommentReply = ({ date, likes, text, user }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  const [like, setLike] = useState(false);
  const onClickHandler = () => {
    setLike(!like);
  };
  const buttonName = like ? textContainer.liked : textContainer.like;
  const theme = useTheme();
  const renderIcon = () => {
    return (
      <ThumbUpIcon
        sx={{
          fontSize: "14px",
          color: theme.palette.interactionCard.iconColor,
        }}
      />
    );
  };
  return (
    <div style={{ marginRight: "56px" }}>
      <InteractionBody
        user={user}
        likes={likes}
        date={date}
        text={text}
        avatar="32px"
        buttonName={buttonName}
        reply={false}
        renderIcon={renderIcon}
      >
        <InteractionFooter
          date={date}
          condition={like}
          onClickHandler={onClickHandler}
          reply={false}
          buttonName={buttonName}
        ></InteractionFooter>
      </InteractionBody>
    </div>
  );
};
