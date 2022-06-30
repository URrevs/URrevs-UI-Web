import { CircularProgress, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";

export const SplashScreen = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Box>
          <img width="197" height="94" src="./images/full_logo.png" />
        </Box>
        <br />
        <Box>
          <LinearProgress sx={{ width: "250px", height: "3px" }} />
        </Box>
      </div>
    </Box>
  );
};
