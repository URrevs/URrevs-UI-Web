import { CircularProgress } from "@mui/material";

const LoadingSpinner = ({ size = 30 }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "15px",
      }}
    >
      <CircularProgress size={size} />
    </div>
  );
};

export default LoadingSpinner;
