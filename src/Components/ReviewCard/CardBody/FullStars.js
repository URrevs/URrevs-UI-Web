import { useTheme } from "@emotion/react";
import * as React from "react";
import { StarLine } from "../../StarLine";
import { ExpansionArrow } from "./ExpansionArrow";

export const FullStars = ({
  // from number of objects in {starsRatingTextContainer}, number of rows will be rendered
  starsRatingTextContainer,
  // to know if card is expanded or not
  expanded,
  index,
  setExpanded,
  arrowExpansion,
  ratings,
  isFullScreen,
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
      {expanded && !isFullScreen && (
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
