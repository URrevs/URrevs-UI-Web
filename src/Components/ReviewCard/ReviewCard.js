import { useTheme } from "@emotion/react";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { Button, Container, useMediaQuery } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { blue } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { reviewsActions } from "../../store/reviewsSlice";
import StarRating from "../AddReview/StarRating";
import BottomCardActionBtn from "./BottomCardActionBtn";
import ExpansionArrow from "./ExpansionArrow";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";

const useStyles = makeStyles({
  card: {
    borderRadius: "10px",
    // boxShadow: "2px 2px #888888",
  },
  header: {
    padding: "12px 0 6px 0",
    margin: "0",
  },
});

export default function ReviewCard({ ukey, onExpand, index }) {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:700px)");
  const reviewDetails = useAppSelector(
    (state) => state.reviews.newReviews[index]
  );

  const classes = useStyles({ isMobile });

  const initialIsExpanded = reviewDetails.isExpanded === true ? true : false;
  const [expanded, setExpanded] = React.useState(initialIsExpanded);

  const initialIsLiked = reviewDetails.isExpanded === true ? true : false;
  const [isLiked, setIsLiked] = React.useState(initialIsLiked);

  const textContainer = useAppSelector((state) => state.language.textContainer);
  const starsRatingTextContainer = useAppSelector(
    (state) => state.language.textContainer.reviewCard.body.starsRating
  );

  const dispatch = useAppDispatch();

  const handleExpandClick = () => {
    dispatch(
      reviewsActions.setIsExpanded({
        index: index,
        isExpanded: !expanded,
      })
    );
    setExpanded(!expanded);
  };

  const actionButtonsDivider = (
    <div style={{ borderLeft: "1px solid #918f8e", height: "20px" }}></div>
  );

  const userAvatarRadius = 40;
  const prosConsTitle = (title) => (
    <div>
      <Typography
        variant="S18W500C050505"
        style={{ padding: 0, paddingTop: 10 }}
        className={classes.header}
      >
        {`${title}:`}
      </Typography>
    </div>
  );

  return (
    <Card
      className={classes.card}
      key={ukey}
      sx={{
        margin: "10px 18px",
        backgroundColor: theme.palette.reviewCard.reviewCardColor,
        boxShadow:
          "0px 4px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);",
      }}
    >
      <CardHeader
        sx={{
          paddingBottom: 1,
        }}
        avatar={
          <Avatar
            sx={{
              bgcolor: blue[500],
              width: `${userAvatarRadius}px`,
              height: `${userAvatarRadius}px`,
            }}
            aria-label="recipe"
          >
            {reviewDetails.user_avatar === null ||
            reviewDetails.user_avatar === "" ? null : (
              <img
                src={reviewDetails.user_avatar}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "/male.jpg";
                }}
                style={{
                  width: `${userAvatarRadius}px`,
                  height: `${userAvatarRadius}px`,
                }}
              />
            )}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <React.Fragment>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="S16W700C050505">
                {reviewDetails.user_name + " "}
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {theme.direction === "rtl" ? (
                  <ArrowLeftRoundedIcon
                    htmlColor={theme.palette.reviewCard.reviewArrow}
                    sx={{ fontSize: 30 }}
                  />
                ) : (
                  <ArrowRightRoundedIcon
                    htmlColor={theme.palette.reviewCard.reviewArrow}
                    sx={{ fontSize: 30 }}
                  />
                )}
              </div>
              <Typography
                variant="S16W700C050505"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
                text
              >
                {reviewDetails.brand +
                  " " +
                  reviewDetails.product +
                  " " +
                  "asdkj baskb dasn dksanl dnasljd laskjd klasjd "}
              </Typography>
            </div>
          </React.Fragment>
        }
        subheader={
          <React.Fragment>
            <Typography variant="S16W700C050505">
              {reviewDetails.user}
            </Typography>

            <div style={{}}>
              <Typography variant="S14W400C65676b">
                {reviewDetails.date_rev.split(" ")[0]}
              </Typography>
              <Typography variant="S14W700C050505"> • </Typography>

              <Typography variant="S14W400C65676b">
                {"امتلكه منذ " + reviewDetails.date_buy.split(" ")[0]}
              </Typography>
              <Typography variant="S14W700C050505"> •</Typography>

              <Typography variant="S14W400C65676b">
                <RemoveRedEyeIcon
                  style={{
                    fontSize: "19",
                    verticalAlign: "middle",
                    margin: "0 2px",
                  }}
                />
                100
              </Typography>
            </div>
          </React.Fragment>
        }
      />
      <CardContent sx={{ paddingBottom: 0, paddingTop: 0 }}>
        <StarRating
          text={starsRatingTextContainer["productGeneralRating"]}
          textSize="S14W500C050505"
          starValue={2}
          isVertical={false}
          readOnly
          rtl={theme.direction === "rtl" ? true : false}
        />
        {!expanded && (
          <ExpansionArrow
            onExpand={onExpand}
            index={index}
            expanded={expanded}
            setExpanded={setExpanded}
            handleExpandClick={handleExpandClick}
          />
        )}
        {expanded && (
          <div>
            {Object.keys(starsRatingTextContainer).map((text, index) => {
              return (
                <React.Fragment>
                  {index === 0 ? (
                    <></>
                  ) : (
                    <StarRating
                      text={starsRatingTextContainer[text]}
                      starValue={index}
                      isVertical={false}
                      readOnly
                      rtl={theme.direction === "rtl" ? true : false}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
        {expanded && (
          <ExpansionArrow
            onExpand={onExpand}
            index={index}
            expanded={expanded}
            setExpanded={setExpanded}
            handleExpandClick={handleExpandClick}
          />
        )}

        {prosConsTitle(textContainer.reviewCard.body.pros)}
        <Typography variant="S16W400C050505">{reviewDetails.pros}</Typography>
        {`\n`}

        {prosConsTitle(textContainer.reviewCard.body.cons)}
        <Typography variant="S16W400C050505">{reviewDetails.cons}</Typography>
      </CardContent>
      <hr
        style={{
          background: "white",
          margin: "15px 12px 0px 12px",
          padding: "0",
          border: "double white 10",
        }}
      />
      <div>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-around",
            padding: "0px 0px",
          }}
        >
          <BottomCardActionBtn
            onClickAction={() => setIsLiked(!isLiked)}
            isHighlighted={isLiked}
            title={
              isLiked
                ? textContainer.reviewCard.actions.liked
                : textContainer.reviewCard.actions.like
            }
            icon={
              isLiked ? (
                <ThumbUpIcon fontSize="medium" />
              ) : (
                <ThumbUpAltOutlinedIcon fontSize="medium" />
              )
            }
          />

          <BottomCardActionBtn
            title={textContainer.reviewCard.actions.comment}
            icon={<ChatBubbleOutlineOutlinedIcon fontSize="medium" />}
          />

          <BottomCardActionBtn
            title={textContainer.reviewCard.actions.share}
            icon={<ShareOutlinedIcon fontSize="medium" />}
          />
        </CardActions>
      </div>
    </Card>
  );
}
