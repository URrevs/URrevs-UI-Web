import { useTheme } from "@emotion/react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useAppSelector } from "../../store/hooks";
import { InteractionBody } from "./InteractionBody";
import { InteractionFooter } from "./InteractionFooter";

export const CommentReply = ({
  date,
  likes,
  text,
  user,
  replyLike,
  replyUnlike,
  liked,
  replyId,
  commentId,
  avatar,
  userId,
}) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  const onLikeClickHandler = liked
    ? replyUnlike.bind(null, commentId, replyId)
    : replyLike.bind(null, commentId, replyId);

  const buttonName = liked ? textContainer.liked : textContainer.like;
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
    <div style={{ margin: "0 56px 0 15px", padding: "4px 0px" }}>
      <InteractionBody
        user={user}
        likes={likes}
        date={date}
        text={text}
        avatarSize="32px"
        buttonName={buttonName}
        renderIcon={renderIcon}
        avatar={avatar}
      >
        <InteractionFooter
          date={date}
          condition={liked}
          onClickHandler={onLikeClickHandler}
          reply={true}
          buttonName={buttonName}
          commentLike={replyLike}
          commentUnlike={replyUnlike}
          commentId={commentId}
          ownerId={userId}
        ></InteractionFooter>
      </InteractionBody>
    </div>
  );
};
