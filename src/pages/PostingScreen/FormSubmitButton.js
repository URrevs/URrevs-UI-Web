import { useTheme } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import OrangeGradientButton from "../../Components/Buttons/OrangeGradientButton";



export const FormSubmitButton = ({ submitLabel }) => {
  const theme = useTheme();
  return (
    <OrangeGradientButton
      type="submit"
      color="red"
      sx={{ width: "100%", textAlign: "center", marginTop: "20px" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <AddIcon
          sx={{
            color: theme.palette.defaultRedBtnIconColor,
            fontSize: "28px",
          }}
        />
        <Typography variant="S18W700Cffffff">{submitLabel}</Typography>
      </Box>
    </OrangeGradientButton>
  );
};
