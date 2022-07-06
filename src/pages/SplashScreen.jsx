import { Box, LinearProgress, useTheme } from "@mui/material";

export const SplashScreen = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Box>
          <img
            width="197"
            height="94"
            alt="splace screen"
            src="/images/full_logo.png"
          />
        </Box>
        <br />
        <Box>
          <LinearProgress sx={{ width: "250px", height: "3px" }} />
        </Box>
      </div>
    </Box>
  );
};
