import StarRoundedIcon from "@mui/icons-material/StarRounded";

const Star = ({ color, size }) => {
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

export default Star;
