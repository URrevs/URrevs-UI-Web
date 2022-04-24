import { useTheme } from "@emotion/react";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { Button, Container, Stack, useMediaQuery } from "@mui/material";
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
import { cropText } from "../../functions/cropText";
import {
  MAX_REVIEW_LETTERS_LIST_BEFORE_EXPAND,
  MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND,
} from "../../constants";
import FooterButton from "./FooterButton";

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

  let pros =
    "Xiaomi mi9t or k20  الهاتف باختصار اداك مميزات كثيرة جدا بسعر قليل لو المميزات دي حطتها في شركة تانيه يعدى ال ١٠ الف و هو اعلى نسخة منه ٥٩٩٩ اولا processor Snapdragon 730  الصراحه جربته على كل ال apps التقيلة و مهنجش فاي واحد ده غير التنقل بين ال apps بسرعه جدا و مدة فتح اي واحد من ثانية لي اثنين  Ram 6gb و طبعا مساعدة فالسرعه جدا    اهم جزء camera  بيجي ب٣ كاميرات  ١ . كاميرا ٤٨ ميجا و زاوية واسعة ودي فالتفاصيل خرافة + معالجة الصور في الكام دي حلوة جدا   ٢. Wide angle ودي خالتني اصور بزاوية واسعه جدا ٠.٦ x ومتوقعتش ان الصورة تطلع فيه حلوة وخصوصا فالاضاءة القوية  ٣. كاميرا العزل ودي شايف انها مش اوي الصراحة وشاومي قالت هتظبطها مع الابديت الجديد  تجربة ال hdr فالصور حلوة جدا  .من اكتر الحجات الحلوة night mide و دي بتوزع الاضاءة بشكل ممتاز بالليل وده من اهم السوفتوير فيتشرز اللي اضافتها  بالنسبة للزوم فانت لحد ٢x الصورة حلوة اما بتزود الصورة بتتدمر  الفيديو بيصور لحد 4k او 1080 60 fps ده موجود فاي موبايل انما الجديد ال staplizer اللي شاومي حطته فالموبايل مثبت الكاميرا فالفيديو بشكل رهيب زي كاميرا gopro لو عارفينها +حطو التثبيت ده كمان في الزاوية الواسعه لك ان تتخيل با  في برضو بعض الحجات زي تايم لابس و slow motion بس شايفهم عاديين  ال pop up فيها كل الmodes اللي فوق +٢٠ ميجا وصورها حلوة بس مش واو يعني بس ممكن تغير صوت الكام حاجه روشه متخافش من البوب اب لان احساس الشاشه الكاملة حاجه تانية.   الشاشة amaloed حاجه فخمه جدا وصورة جميلة جدا و خصوصا لما جربت hdr+ على اليوتيوب الشاشة الكاملة حلوة جدا فالفيديوهات  البصمة المدمجه فالشاشة اثبتت نجاحها مش زي a70 سريعه جدا  .برضو قفل الوجه سريع و بيفتح فالاضاءة القليلة   تصميم الموبايل   مريح فالايد والضهر ازاز وشكله جميل و الشاشة gorilla 5plus الموبايل وقع مرتين ومنكسرش   في با بعض الحجات هتلاقوها فالسيتنج لزيزة بس موجودة في موبايلات كتير زي الموبايلين عشان الخصوصية     الموبايل بيشحن في ساعه لحد ٩٠/١٠٠  ";

  let cons = reviewDetails.cons;

  const userName = reviewDetails.user_name;
  const productName = reviewDetails.brand + " " + reviewDetails.product + " ";

  const classes = useStyles({ isMobile });

  const initialIsExpanded = reviewDetails.isExpanded === true ? true : false;
  const [expanded, setExpanded] = React.useState(initialIsExpanded);

  const initialIsLiked = reviewDetails.isExpanded === true ? true : false;
  const [isLiked, setIsLiked] = React.useState(initialIsLiked);

  const [croppedText, setCroppedText] = React.useState({
    pros: "",
    cons: "",
    endOfText: false,
  });

  React.useEffect(() => {
    setCroppedText(
      cropText(
        pros,
        cons,
        MAX_REVIEW_LETTERS_LIST_BEFORE_EXPAND,
        MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND
      )
    );
    onExpand(index);
  }, []);

  const textContainer = useAppSelector((state) => state.language.textContainer);
  const starsRatingTextContainer = useAppSelector(
    (state) => state.language.textContainer.reviewCard.body.starsRating
  );

  const dispatch = useAppDispatch();

  const arrowExpansion = () => {
    if (expanded) {
      // shrink
      setExpanded(false);
      // shrink to limit
      setCroppedText(
        cropText(
          pros,
          cons,
          MAX_REVIEW_LETTERS_LIST_BEFORE_EXPAND,
          MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND
        )
      );
    } else {
      // expand
      setExpanded(true);
      // expand to limit
      setCroppedText(
        cropText(
          pros,
          cons,
          MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND,
          MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND
        )
      );
    }
    dispatch(
      reviewsActions.setIsExpanded({
        index: index,
        isExpanded: !expanded,
      })
    );
  };

  const handleExpandClick = () => {
    console.log(expanded);

    // dispatch(
    //   reviewsActions.setIsExpanded({
    //     index: index,
    //     isExpanded: !expanded,
    //   })
    // );
    onExpand(index);
    if (croppedText.endOfText) {
      // shrink
      setExpanded(false);
      setCroppedText(
        cropText(
          pros,
          cons,
          MAX_REVIEW_LETTERS_LIST_BEFORE_EXPAND,
          MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND
        )
      );
    } else if (expanded) {
      // expand to infinity
      setExpanded(true);
      setCroppedText(cropText(pros, cons, 10000, 10000));
    } else {
      setExpanded(true);
      // expand to limit
      setCroppedText(
        cropText(
          pros,
          cons,
          MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND,
          MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND
        )
      );
    }
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
              <Typography
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  textAlign: "center",
                  direction: "rtl",
                  maxWidth: "50%",
                }}
                variant="S16W700C050505"
              >
                {userName}
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
                  textAlign: "center",
                  direction: "rtl",
                  maxWidth: "50%",
                }}
              >
                {productName}
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
            handleExpandClick={arrowExpansion}
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
            handleExpandClick={arrowExpansion}
          />
        )}
        {prosConsTitle(textContainer.reviewCard.body.pros)}
        <Typography variant="S16W400C050505">{croppedText.pros}</Typography>
        {`\n`}
        {/* {croppedText.cons.length === 0 && (
          <div>
            <Typography
              sx={{ textDecoration: "underline" }}
              variant="S18W800C050505"
            >
              المزيد
            </Typography>
          </div>
        )} */}
        {croppedText.cons.length != 0 &&
          prosConsTitle(textContainer.reviewCard.body.cons)}
        <Typography variant="S16W400C050505">{croppedText.cons}</Typography>
        {croppedText.endOfText === false || expanded ? (
          <div
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleExpandClick()}
          >
            <Typography
              sx={{ textDecoration: "underline" }}
              variant="S18W800C050505"
            >
              {croppedText.endOfText
                ? "اقل"
                : expanded
                ? "المزيد والمزيد"
                : "المزيد"}
            </Typography>
          </div>
        ) : (
          <></>
        )}{" "}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "8px 0px 6px 0px",
          }}
        >
          <FooterButton
            icon={
              <ThumbUpAltOutlinedIcon
                style={{
                  color: theme.palette.reviewCard.actionBtnIcon,
                  fontSize: "20px",
                }}
              />
            }
            number={100}
            isClickable={false}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <FooterButton
              icon={
                <ChatBubbleOutlineOutlinedIcon
                  style={{
                    color: theme.palette.reviewCard.actionBtnIcon,
                    fontSize: "20px",
                  }}
                />
              }
              number={100}
              isClickable={true}
            />
            <div style={{ width: "10px" }}></div>
            <FooterButton
              icon={
                <ShareOutlinedIcon
                  style={{
                    color: theme.palette.reviewCard.actionBtnIcon,
                    fontSize: "20px",
                  }}
                />
              }
              number={100}
              isClickable={false}
            />
          </div>
        </div>
      </CardContent>
      <hr
        style={{
          background: "white",
          margin: "0px 12px 0px 12px",
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
