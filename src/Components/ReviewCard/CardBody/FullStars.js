import { useTheme } from "@emotion/react";
import * as React from "react";
import StarRating from "../../Form/StarRating";
import ExpansionArrow from "./ExpansionArrow";

const FullStars = ({
  // from number of objects in {starsRatingTextContainer}, number of rows will be rendered
  starsRatingTextContainer,
  // to know if card is expanded or not
  expanded,
  clearIndexCache,
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
          clearIndexCache={clearIndexCache}
          index={index}
          expanded={expanded}
          setExpanded={setExpanded}
          handleExpandClick={arrowExpansion}
        />
      )}
      {/* Full Stars Rating */}
      {expanded && (
        <div>
          {starsRatingTextContainer.map((text, index) => {
            return (
              <React.Fragment key={index}>
                {index === 0 ? (
                  <></>
                ) : (
                  <StarRating
                    text={starsRatingTextContainer[index]}
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
          clearIndexCache={clearIndexCache}
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
