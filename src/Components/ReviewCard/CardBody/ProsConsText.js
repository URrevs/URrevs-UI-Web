import { Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../store/hooks";
import { cropText } from "../../../functions/cropText";
import BodyCardText from "./BodyCardText";

const ProsConsText = ({
  expanded,
  croppedText,
  prosTitle,
  consTitle,
  seeMoreButtonHandler,
}) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  return (
    <div>
      <BodyCardText title={prosTitle} text={croppedText.pros} />

      {croppedText.cons.length != 0 && (
        <BodyCardText title={consTitle} text={croppedText.cons} />
      )}
    </div>
  );
};

export default ProsConsText;
