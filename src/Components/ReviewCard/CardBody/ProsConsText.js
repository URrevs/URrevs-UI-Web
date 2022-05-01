import { Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../store/hooks";
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
  const textContainer = useAppSelector((state) => state.language.textContainer);

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
          onClick={() => console.log("see more button")}
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
    </div>
  );
};

export default ProsConsText;
