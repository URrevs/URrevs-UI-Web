import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CheckIcon from "@mui/icons-material/Check";
import { InteractionBody } from "./InteractionBody";
import { useTheme } from "@emotion/react";

export const Answer = (props) => {
  const theme = useTheme();
  const condition = true;
  const buttonName = condition ? "اجابة مقبولة" : "أقبل الاجابة";
  const renderIcon = () => {
    return (
      <ArrowUpwardIcon
        sx={{
          fontSize: "14px",
          color: theme.palette.interactionCard.iconColor,
        }}
      />
    );
  };
  return (
    <div style={{ display: "flex", marginRight: "20px" }}>
      {condition ? (
        <CheckIcon
          sx={{
            fontSize: "40px",
            padding: 0,
            color: theme.palette.interactionCard.iconColor,
          }}
        ></CheckIcon>
      ) : null}
      <div style={{ marginRight: "12px" }}>
        <InteractionBody
          {...props}
          condition={condition}
          buttonName={buttonName}
          renderIcon={renderIcon}
        ></InteractionBody>
      </div>
    </div>
  );
};
