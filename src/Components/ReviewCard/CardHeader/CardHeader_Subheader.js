import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useConvertNumberToHumanLanguage } from "../../../hooks/useMillify";
import { useAppSelector } from "../../../store/hooks";
import { convertDateToString } from "../../../functions/convertDateToString";
import { subtractDate } from "../../../functions/subtractDate";
import { IconButton, Tooltip } from "@mui/material";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import { useTheme } from "@emotion/react";

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

  reviewDate = convertDateToString(reviewDate, language);
  if (buyDate) buyDate = subtractDate(buyDate, language);

  let verificationRatioText = "";

  if (verificationRatio === 0) {
    verificationRatioText = "placeholder";
  } else if (verificationRatio === -1) {
    verificationRatio = textContainer.thisReviewIsFromAnApplePhone;
  } else {
    verificationRatioText =
      textContainer.thisReviewIsVerifiedBy + " " + verificationRatio + "%";
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
