import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { InteractionBody } from "./InteractionBody";
import { useTheme } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import { InteractionFooter } from "./InteractionFooter";
import { useAppSelector } from "../../store/hooks";

export const Answer = ({
  date,
  likes,
  text,
  user,
  subtitle,
  admin = false,
}) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  const theme = useTheme();
  const [accepted, setAccepted] = useState(false);
  const onClickHandler = () => {
    setAccepted(!accepted);
  };
  const buttonName1 = accepted
    ? textContainer.acceptedAnswer
    : textContainer.acceptAnswer;
  const buttonName2 = textContainer.vote;
  const buttonName = admin ? buttonName1 : buttonName2;
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
    <div style={{ display: "flex" }}>
      {accepted && admin ? (
        <CheckIcon
          sx={{
            fontSize: "40px",
            padding: 0,
            color: theme.palette.interactionCard.iconColor,
          }}
        ></CheckIcon>
      ) : null}
      <div>
        <InteractionBody
          user={user}
          likes={likes}
          date={date}
          text={text}
          condition={accepted}
          onClickHandler={onClickHandler}
          buttonName={buttonName}
          renderIcon={renderIcon}
        >
          <InteractionFooter
            date={date}
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
