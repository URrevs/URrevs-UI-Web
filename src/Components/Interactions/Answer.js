import { useTheme } from "@emotion/react";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckIcon from "@mui/icons-material/Check";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { PostingField } from "../PostingComponents/PostingField";
import { InteractionBody } from "./InteractionBody";
import { InteractionFooter } from "./InteractionFooter";

export const Answer = ({
  commentId,
  answerId,
  date,
  user,
  likes,
  text,
  upvoted,
  commentLike,
  commentUnlike,
  submitReplyHandler,
  avatarm,
  ownerId,
  questionOwnerId,
  questionId,
  subtitle,
  acceptAnswer,
  rejectAnswer,
  acceptedAnswer,
  avatar,
  ownedAt,
  showReply = true,
}) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const currentUserId = useAppSelector((state) => state.auth).uid;

  const theme = useTheme();

  const buttonName1 = acceptedAnswer
    ? textContainer.acceptedAnswer
    : textContainer.acceptAnswer;

  // if the question asker
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (questionOwnerId === currentUserId) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [currentUserId]);

  const onClickHandler = admin
    ? acceptedAnswer
      ? rejectAnswer.bind(null, questionId, commentId)
      : acceptAnswer.bind(null, questionId, commentId)
    : upvoted
    ? commentUnlike.bind(null, commentId)
    : commentLike.bind(null, commentId);

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
    <div style={{ display: "flex", padding: "4px 0px" }}>
      {acceptedAnswer ? (
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
          condition={upvoted}
          buttonName={buttonName}
          renderIcon={renderIcon}
          avatar={avatar}
          ownedAt={ownedAt}
        >
          <InteractionFooter
            date={date}
            condition={admin ? acceptedAnswer : upvoted}
            onClickHandler={onClickHandler}
            reply={false}
            buttonName={buttonName}
            ownerId={ownerId}
          ></InteractionFooter>
        </InteractionBody>
        {showReply && (
          <PostingField
            avatar={true}
            placeholder="اكتب اجابة"
            onSubmit={(text) => submitReplyHandler(text, commentId)}
          />
        )}
      </div>
    </div>
  );
};
