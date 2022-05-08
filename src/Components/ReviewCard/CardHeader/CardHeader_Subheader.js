import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useConvertNumberToHumanLanguage } from "../../../hooks/useMillify";
import { useAppSelector } from "../../../store/hooks";
import { convertDateToString } from "../../../functions/convertDateToString";
import { substituteDate } from "../../../functions/substituteDate";

const CardSubheader = ({ reviewDate, buyDate, showViewsCounter, views }) => {
  const convert = useConvertNumberToHumanLanguage;
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const language = useAppSelector((state) => state.language.language);

  reviewDate = convertDateToString(reviewDate, language);
  if (buyDate) buyDate = substituteDate(buyDate, language);

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
      </div>
    </React.Fragment>
  );
};

export default CardSubheader;
