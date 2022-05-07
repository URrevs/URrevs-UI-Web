import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useConvertNumberToHumanLanguage } from "../../../hooks/useMillify";
import { useAppSelector } from "../../../store/hooks";
import { useConvertDateToString } from "../../../functions/convertDateToString";
import { useSubstituteDate } from "../../../hooks/useSubstituteDate";

const CardSubheader = ({ reviewDate, buyDate, showViewsCounter }) => {
  const convert = useConvertNumberToHumanLanguage;
  const textContainer = useAppSelector((state) => state.language.textContainer);
  // buyDate = useConvertDateToString(buyDate);
  // reviewDate = useSubstituteDate(reviewDate);

  return (
    <React.Fragment>
      <div>
        <Typography variant="S14W400C65676b">{reviewDate}</Typography>
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
            {convert(1000)}
          </Typography>
        )}
      </div>
    </React.Fragment>
  );
};

export default CardSubheader;
