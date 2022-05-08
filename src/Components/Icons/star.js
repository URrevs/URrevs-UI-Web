import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

export const RoundedStar = ({ color, size }) => {
  return (
    <StarRoundedIcon
      htmlColor={color}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};
export const RoundedOutlinedStar = ({ color, size }) => {
  return (
    <StarOutlineRoundedIcon
      htmlColor={color}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};
