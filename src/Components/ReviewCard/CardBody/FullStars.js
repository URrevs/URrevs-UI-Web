import { useTheme } from "@emotion/react";
import * as React from "react";
import StarRating from "../../Form/StarRating";
import { StarLine } from "../../StarLine";
import ExpansionArrow from "./ExpansionArrow";

const FullStars = ({
  // from number of objects in {starsRatingTextContainer}, number of rows will be rendered
  starsRatingTextContainer,
  // to know if card is expanded or not
  expanded,
  index,
  setExpanded,
  arrowExpansion,
  ratings,
}) => {
  const theme = useTheme();
  return (
    <div>
      {/* Expansion arrow */}
      {!expanded && (
        <ExpansionArrow
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
                  <StarLine
                    label={starsRatingTextContainer[index]}
                    value={ratings[index]}
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
