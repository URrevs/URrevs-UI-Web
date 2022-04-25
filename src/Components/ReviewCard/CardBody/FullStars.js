import { useTheme } from "@emotion/react";
import * as React from "react";
import StarRating from "../../AddReview/StarRating";
import ExpansionArrow from "../ExpansionArrow";

const FullStars = ({
  // from number of objects in {starsRatingTextContainer}, number of rows will be rendered
  starsRatingTextContainer,
  // to know if card is expanded or not
  expanded,
  onExpand,
  index,
  setExpanded,
  arrowExpansion,
}) => {
  const theme = useTheme();

  return (
    <div>
      {/* Expansion arrow */}
      {!expanded && (
        <ExpansionArrow
          onExpand={onExpand}
          index={index}
          expanded={expanded}
          setExpanded={setExpanded}
          handleExpandClick={arrowExpansion}
        />
      )}
      {/* Full Stars Rating */}
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
      {/* Shrinking Arrow */}
      {expanded && (
        <ExpansionArrow
          onExpand={onExpand}
          index={index}
          expanded={expanded}
          setExpanded={setExpanded}
          handleExpandClick={arrowExpansion}
        />
      )}
    </div>
  );
};

export default FullStars;
