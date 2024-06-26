import { useTheme } from "@emotion/react";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { convertDateToString } from "../../../functions/convertDateToString";
import { subtractDate } from "../../../functions/subtractDate";
import { useConvertNumberToHumanLanguage } from "../../../hooks/useMillify";
import { useAppSelector } from "../../../store/hooks";

const CardSubheader = ({
  reviewDate,
  buyDate,
  showViewsCounter,
  views,
  verificationRatio = 0,
}) => {
  const convert = useConvertNumberToHumanLanguage;
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const language = useAppSelector((state) => state.language.language);
  const theme = useTheme();

  if (buyDate) buyDate = subtractDate(buyDate, language, new Date(reviewDate));
  reviewDate = convertDateToString(reviewDate, language);

  let verificationRatioText = "";

  if (verificationRatio === 0) {
    verificationRatioText = "";
  } else if (verificationRatio === -1) {
    verificationRatioText = textContainer.thisReviewIsFromAnApplePhone;
  } else {
    verificationRatioText =
      textContainer.thisReviewIsVerifiedBy +
      " " +
      verificationRatio.toFixed(0) +
      "%";
  }

  return (
    <React.Fragment>
      <div>
        {<Typography variant="S14W400C65676b">{reviewDate}</Typography>}
        {buyDate && (
          <Typography variant="S14W700C050505">
            {" "}
            •{" "}
            <Typography variant="S14W400C65676b">
              {textContainer.usedThisFor + " " + buyDate}
            </Typography>
          </Typography>
        )}
        {showViewsCounter && (
          <Typography variant="S14W400C65676b">
            <Typography variant="S14W700C050505"> •</Typography>
            <RemoveRedEyeIcon
              style={{
                fontSize: "19",
                verticalAlign: "middle",
                margin: "0 2px",
                marginTop: "-3px",
              }}
            />
            {convert(views)}
          </Typography>
        )}
        {verificationRatioText !== "" && (
          <Typography variant="S14W400C65676b">
            <Typography variant="S14W700C050505"> •</Typography>
            <Tooltip title={verificationRatioText}>
              <CheckCircleSharpIcon
                style={{
                  fontSize: "16",
                  verticalAlign: "middle",
                  margin: "0 2px",
                  marginTop: "-2px",
                  color: theme.palette.reviewCard.actionBtnIconHighlight,
                }}
              />
            </Tooltip>
          </Typography>
        )}
      </div>
    </React.Fragment>
  );
};

export default CardSubheader;
