import { useTheme } from "@emotion/react";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { TextButton } from "../Buttons/TextButton";
import { PostingField } from "../PostingComponents/PostingField";
import { CommentReply } from "./CommentReply";
import { InteractionBody } from "./InteractionBody";
import { InteractionFooter } from "./InteractionFooter";
import { Virtuoso } from "react-virtuoso";

export const Answer = ({
  commentId,
  date,
  likes,
  text,
  upvoted,
  commentLike,
  commentUnlike,
  submitReplyHandler,
  ownerId,
  questionOwnerId,
  questionId,
  acceptAnswer,
  rejectAnswer,
  acceptedAnswer,
  avatar,
  ownedAt,
  userId,
  userName,
  answerReportFunction,
  replies = [],
  likeReplyRequest,
  unLikeReplyRequest,
  replyReportFunction,
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

  const [showReplyField, setShowReplyField] = useState(false);

  const toggleReplyField = () => setShowReplyField((show) => !show);
  const [showReplies, setShowReplies] = useState(false);

  const repliesPadding = !acceptedAnswer ? "54px" : `${54 + 40}px`;
  return (
    <div
      style={{
        maxWidth: "calc(100% - 20px)",
        padding: "4px 0px",
      }}
    >
      <div>
        <InteractionBody
          userName={userName}
          userId={userId}
          likes={likes}
          date={date}
          text={text}
          condition={upvoted}
          buttonName={buttonName}
          renderIcon={renderIcon}
          avatar={avatar}
          ownedAt={ownedAt}
          showCorrectIcon={acceptedAnswer}
          reportFunction={answerReportFunction}
        >
          <InteractionFooter
            date={date}
            condition={admin ? acceptedAnswer : upvoted}
            onClickHandler={onClickHandler}
            reply={false}
            buttonName={buttonName}
            ownerId={ownerId}
            showReplyField={toggleReplyField}
          ></InteractionFooter>
        </InteractionBody>
        {showReplyField && (
          <PostingField
            avatar={true}
            placeholder="اكتب رد"
            reply
            onSubmit={(text) => submitReplyHandler(text, commentId)}
          />
        )}
      </div>
      {/* replies list */}
      <div style={{ marginRight: repliesPadding }}>
        {replies.length !== 0 && !showReplies ? (
          <TextButton
            title={`${replies.length} ${textContainer.reply}`}
            onClick={() => setShowReplies((show) => !show)}
          />
        ) : (
          <Virtuoso
            useWindowScroll
            data={replies}
            increaseViewportBy={{ top: 500, bottom: 500 }}
            overscan={10}
            itemContent={(index, reply) => {
              return (
                <CommentReply
                  replyId={reply._id}
                  date={reply.createdAt}
                  likes={reply.likes}
                  text={reply.content}
                  liked={reply.liked}
                  replyLike={likeReplyRequest}
                  replyUnlike={unLikeReplyRequest}
                  commentId={reply.commentId}
                  avatar={reply.userPicture}
                  userName={reply.userName}
                  userId={reply.userId}
                  reportFunction={() => {
                    replyReportFunction(reply.commentId, reply._id);
                  }}
                />
              );
            }}
          />
        )}
      </div>
    </div>
  );
};
