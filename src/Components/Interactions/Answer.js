import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { InteractionBody } from "./InteractionBody";
import { useTheme } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import { InteractionFooter } from "./InteractionFooter";

export const Answer = (props) => {
  const theme = useTheme();
  const [accepted, setAccepted] = useState(false);
  const onClickHandler = () => {
    setAccepted(!accepted);
  };
  const buttonName1 = accepted ? "اجابة مقبولة" : "أقبل الاجابة";
  const buttonName2 = "تصويت";
  const buttonName = props.admin ? buttonName1 : buttonName2;
  const renderIcon = () => {
    return (
      <FontAwesomeIcon
        icon={faUpLong}
        fontSize="14px"
        color={theme.palette.interactionCard.iconColor}
      />
    );
  };
  return (
    <div style={{ display: "flex", marginRight: "20px" }}>
      {accepted && props.admin ? (
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
          condition={accepted}
          onClickHandler={onClickHandler}
          buttonName={buttonName}
          renderIcon={renderIcon}
        >
          <InteractionFooter
            date={props.date}
            condition={accepted}
            onClickHandler={onClickHandler}
            reply={false}
            buttonName={buttonName}
          ></InteractionFooter>
        </InteractionBody>
      </div>
    </div>
  );
};
