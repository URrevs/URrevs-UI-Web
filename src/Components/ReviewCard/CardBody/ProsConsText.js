import { Typography } from "@mui/material";
import React from "react";

import { cropText } from "../../../functions/cropText";
import BodyCardText from "./BodyCardText";

const ProsConsText = ({
  index,
  clearIndexCache,
  expanded,
  croppedText,
  setExpanded,
  setCroppedText,
  prosTitle,
  consTitle,
  pros,
  cons,
  maxLetters,
  maxOfMaxLetters,
}) => {
  const handleExpandClick = () => {
    // dispatch(
    //   reviewsActions.setIsExpanded({
    //     index: index,
    //     isExpanded: !expanded,
    //   })
    // );
    clearIndexCache(index);
    if (croppedText.endOfText) {
      // shrink
      setExpanded(false);
      setCroppedText(cropText(pros, cons, maxLetters, maxOfMaxLetters));
    } else if (expanded) {
      // expand to infinity
      setExpanded(true);
      setCroppedText(cropText(pros, cons, 10000, 10000));
    } else {
      setExpanded(true);
      // expand to limit
      setCroppedText(cropText(pros, cons, maxOfMaxLetters, maxOfMaxLetters));
    }
  };
  return (
    <div>
      <BodyCardText title={prosTitle} text={croppedText.pros} />

      {croppedText.cons.length != 0 && (
        <BodyCardText title={consTitle} text={croppedText.cons} />
      )}

      {/* see more button */}
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
              ? "عرض الكل"
              : "المزيد"}
          </Typography>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProsConsText;
