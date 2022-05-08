import { CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "15px",
      }}
    >
      <CircularProgress size={30} />
    </div>
  );
};

export default LoadingSpinner;
