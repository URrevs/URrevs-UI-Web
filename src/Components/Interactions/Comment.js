import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { InteractionBody } from "./InteractionBody";
import { useTheme } from "@emotion/react";
import { InteractionFooter } from "./InteractionFooter";

export const Comment = (props) => {
  const [like, setLike] = useState(false);
  const onClickHandler = () => {
    setLike(!like);
  };
  const buttonName = like ? "أعجبني" : "اعجاب";
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
    <div style={{ marginRight: "28px" }}>
      <InteractionBody
        {...props}
        buttonName={buttonName}
        renderIcon={renderIcon}
      >
        <InteractionFooter
          date={props.date}
          condition={like}
          onClickHandler={onClickHandler}
          reply={false}
          buttonName={buttonName}
        ></InteractionFooter>
      </InteractionBody>
    </div>
  );
};
