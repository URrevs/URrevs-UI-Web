import { useTheme } from "@emotion/react";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import {
  MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND,
  MAX_REVIEW_LETTERS_LIST_BEFORE_EXPAND,
  USER_CIRCLE_AVATAR_LARGE
} from "../../constants";
import { cropText } from "../../functions/cropText";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { reviewsActions } from "../../store/reviewsSlice";
import Cardm from "../Card";
import CardActionButtons from "./CardActions/CardActionButtons";
import ProsConsText from "./CardBody/ProsConsText";
import CardFooter from "./CardFooter/CardFooter";
import CardHeader from "./CardHeader/CardHeader";

export default function QuestionCard({
  ukey,
  clearIndexCache,
  index,
  reviewDetails,
}) {
  const isReview = false;
  const theme = useTheme();

  let pros = "هل الهاتف جيد";
  let cons = "";

  const userName = reviewDetails.user_name;
  const productName = reviewDetails.brand + " " + reviewDetails.product + " ";

  const initialIsExpanded = reviewDetails.isExpanded === true ? true : false;
  const [expanded, setExpanded] = React.useState(initialIsExpanded);

  const initialIsLiked = reviewDetails.isExpanded === true ? true : false;
  const [isLiked, setIsLiked] = React.useState(initialIsLiked);

  const textContainer = useAppSelector((state) => state.language.textContainer);

  const dispatch = useAppDispatch();

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
    // dispatch(
    //   reviewsActions.setIsExpanded({
    //     index: index,
    //     isExpanded: !expanded,
    //   })
    // );
  };

  return (
    <Cardm
      key={ukey}
      reviewIcon={false}
      tooltipTitle={textContainer.askedQuestion}
    >
      <CardHeader
        userAvatar={reviewDetails.user_avatar}
        userName={userName}
        avatarRadius={USER_CIRCLE_AVATAR_LARGE}
        productName={productName}
        reviewDate={reviewDetails.date_rev}
        showViewsCounter={false}
      />
      <CardContent style={{ paddingBottom: 0, paddingTop: 0 }}>
        <ProsConsText
          index={index}
          pros={pros}
          cons=""
          expanded={expanded}
          prosTitle=""
          consTitle=""
          clearIndexCache={clearIndexCache}
          croppedText={croppedText}
          setExpanded={setExpanded}
          setCroppedText={setCroppedText}
          maxLetters={MAX_REVIEW_LETTERS_LIST_BEFORE_EXPAND}
          maxOfMaxLetters={MAX_REVIEW_LETTERS_LIST_AFTER_EXPAND}
        />

        <CardFooter isReview={isReview} />
        {/* divider */}
        <hr
          style={{
            background: "white",
            margin: "0",
            padding: "0",
            border: "double white 10",
          }}
        />
        <CardActionButtons
          isReview={isReview}
          textContainer={textContainer}
          setIsLiked={setIsLiked}
          isLiked={isLiked}
          firstButtonNonPressedText={textContainer.vote}
          firstButtonPressedText={textContainer.vote}
        />
      </CardContent>
    </Cardm>
  );
}
