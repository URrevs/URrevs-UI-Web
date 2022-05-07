import { useTheme } from "@emotion/react";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import {
  MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND,
  MAX_REVIEW_LETTERS_LIST_BEFORE_EXPAND,
  USER_CIRCLE_AVATAR_LARGE,
} from "../../constants";
import { cropText } from "../../functions/cropText";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { reviewsActions } from "../../store/reviewsSlice";
import StarRating from "../Form/StarRating";
import Card from "../Card";
import CardActionButtons from "./CardActions/CardActionButtons";
import FullStars from "./CardBody/FullStars";
import ProsConsText from "./CardBody/ProsConsText";
import CardFooter from "./CardFooter/CardFooter";
import CardHeader from "./CardHeader/CardHeader";
import { Box, ButtonBase, Grid, Typography } from "@mui/material";
import { StarLine } from "../StarLine";
import { useNavigate } from "react-router-dom";

export default function ReviewCard({
  ukey,
  clearIndexCache,
  index,
  reviewDetails,
  isPhoneReview,
  views,
  ratings,
  fullScreen,
}) {
  const isReview = true;
  const theme = useTheme();
  const navigate = useNavigate();

  let pros =
    "Xiaomi mi9t or k20  الهاتف باختصار اداك مميزات كثيرة جدا بسعر قليل لو المميزات دي حطتها في شركة تانيه يعدى ال ١٠ الف و هو اعلى نسخة منه ٥٩٩٩ اولا processor Snapdragon 730  الصراحه جربته على كل ال apps التقيلة و مهنجش فاي واحد ده غير التنقل بين ال apps بسرعه جدا و مدة فتح اي واحد من ثانية لي اثنين  Ram 6gb و طبعا مساعدة فالسرعه جدا    اهم جزء camera  بيجي ب٣ كاميرات  ١ . كاميرا ٤٨ ميجا و زاوية واسعة ودي فالتفاصيل خرافة + معالجة الصور في الكام دي حلوة جدا   ٢. Wide angle ودي خالتني اصور بزاوية واسعه جدا ٠.٦ x ومتوقعتش ان الصورة تطلع فيه حلوة وخصوصا فالاضاءة القوية  ٣. كاميرا العزل ودي شايف انها مش اوي الصراحة وشاومي قالت هتظبطها مع الابديت الجديد  تجربة ال hdr فالصور حلوة جدا  .من اكتر الحجات الحلوة night mide و دي بتوزع الاضاءة بشكل ممتاز بالليل وده من اهم السوفتوير فيتشرز اللي اضافتها  بالنسبة للزوم فانت لحد ٢x الصورة حلوة اما بتزود الصورة بتتدمر  الفيديو بيصور لحد 4k او 1080 60 fps ده موجود فاي موبايل انما الجديد ال staplizer اللي شاومي حطته فالموبايل مثبت الكاميرا فالفيديو بشكل رهيب زي كاميرا gopro لو عارفينها +حطو التثبيت ده كمان في الزاوية الواسعه لك ان تتخيل با  في برضو بعض الحجات زي تايم لابس و slow motion بس شايفهم عاديين  ال pop up فيها كل الmodes اللي فوق +٢٠ ميجا وصورها حلوة بس مش واو يعني بس ممكن تغير صوت الكام حاجه روشه متخافش من البوب اب لان احساس الشاشه الكاملة حاجه تانية.   الشاشة amaloed حاجه فخمه جدا وصورة جميلة جدا و خصوصا لما جربت hdr+ على اليوتيوب الشاشة الكاملة حلوة جدا فالفيديوهات  البصمة المدمجه فالشاشة اثبتت نجاحها مش زي a70 سريعه جدا  .برضو قفل الوجه سريع و بيفتح فالاضاءة القليلة   تصميم الموبايل   مريح فالايد والضهر ازاز وشكله جميل و الشاشة gorilla 5plus الموبايل وقع مرتين ومنكسرش   في با بعض الحجات هتلاقوها فالسيتنج لزيزة بس موجودة في موبايلات كتير زي الموبايلين عشان الخصوصية     الموبايل بيشحن في ساعه لحد ٩٠/١٠٠  ";

  let cons = reviewDetails.cons;

  const userName = reviewDetails.user_name;

  const brand = reviewDetails.brand ?? "";
  const product = reviewDetails.product ?? "";
  const productName = brand + " " + product + " ";

  const initialIsExpanded = reviewDetails.isExpanded === true ? true : false;
  const [expanded, setExpanded] = React.useState(initialIsExpanded);

  const initialIsLiked = reviewDetails.isExpanded === true ? true : false;
  const [isLiked, setIsLiked] = React.useState(initialIsLiked);

  const textContainer = useAppSelector((state) => state.language.textContainer);

  const starsRatingTextContainer = [
    textContainer.generalProductRating,
    textContainer.userInterface,
    textContainer.manufacturingQuality,
    textContainer.priceQuality,
    textContainer.camera,
    textContainer.callsQuality,
    textContainer.battery,
  ];

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
    clearIndexCache(index);
  }, []);

  const navigateToFullScreen = () => {
    console.log("aaaa");
    navigate(`review?id=${reviewDetails.id}`);
  };

  const handleSeeMoreExpansion = () => {
    clearIndexCache(index);
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
      // setExpanded(true);
      // setCroppedText(cropText(pros, cons, 10000, 10000));
      navigateToFullScreen();
    } else {
      // expand to limit
      setExpanded(true);
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

  const handleExpandClick = () => {
    clearIndexCache(index);
    if (expanded) {
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
    } else {
      // expand to limit
      setExpanded(true);
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

  return (
    <Card
      key={ukey}
      reviewIcon={true}
      tooltipTitle={
        isPhoneReview
          ? textContainer.productReview
          : textContainer.companyReview
      }
    >
      <CardHeader
        userAvatar={reviewDetails.user_avatar}
        userName={userName}
        avatarRadius={USER_CIRCLE_AVATAR_LARGE}
        productName={productName}
        reviewDate={reviewDetails.date_rev}
        buyDate={reviewDetails.date_buy}
        showViewsCounter={true}
        views={views}
      />
      <CardContent style={{ padding: 0 }}>
        <ButtonBase
          component="div"
          style={{
            display: "block",
            padding: "0px 16px",
            cursor: "pointer",
            "&:hover": { background: "#000" },
          }}
          onClick={
            fullScreen
              ? null
              : () => {
                  handleExpandClick();
                }
          }
        >
          {/* General stars rating */}
          <StarLine
            label={
              isPhoneReview
                ? textContainer.generalProductRating
                : textContainer.generalCompanyRating
            }
            value={ratings[0]}
          />
          {/* stars rating */}
          {isPhoneReview && (
            <div>
              <FullStars
                starsRatingTextContainer={starsRatingTextContainer}
                expanded={expanded}
                clearIndexCache={clearIndexCache}
                index={index}
                ratings={ratings.slice(1)}
              />
            </div>
          )}
          <ProsConsText
            expanded={expanded}
            croppedText={croppedText}
            prosTitle={`${textContainer.pros}:`}
            consTitle={`${textContainer.cons}:`}
          />
        </ButtonBase>

        {fullScreen ? (
          <></>
        ) : (
          <Box style={{ padding: "0px 16px" }}>
            {/* see more button */}
            {croppedText.endOfText === false || expanded ? (
              <div
                style={{
                  cursor: "pointer",
                }}
                onClick={handleSeeMoreExpansion}
              >
                <Typography
                  sx={{ textDecoration: "underline" }}
                  variant="S18W800C050505"
                >
                  {croppedText.endOfText
                    ? textContainer.seeLess
                    : expanded
                    ? textContainer.seeMore
                    : textContainer.seeMore}
                </Typography>
              </div>
            ) : (
              <></>
            )}
          </Box>
        )}

        <Box
          style={{
            padding: "0px 16px",
          }}
        >
          <CardFooter
            isReview={isReview}
            navigateToFullScreen={navigateToFullScreen}
            shareCounter={reviewDetails.shareCounter}
            likesCounter={reviewDetails.likesCounter}
            commentsCounter={reviewDetails.commentsCounter}
          />

          <CardActionButtons
            isReview={isReview}
            textContainer={textContainer}
            setIsLiked={setIsLiked}
            isLiked={reviewDetails.isLiked}
            firstButtonNonPressedText={textContainer.like}
            firstButtonPressedText={textContainer.liked}
            navigateToFullScreen={navigateToFullScreen}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
