import { useTheme } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";
import LoadingSpinner from "../../Components/Loaders/LoadingSpinner";
import { Box } from "@mui/system";
import React from "react";

import OrangeGradientButton from "../../Components/Buttons/OrangeGradientButton";

export const FormSubmitButton = ({
  submitLabel,

  loading = false,
}) => {
  const theme = useTheme();
  const renderBtnContent = () => (
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
  );
  return (
    <div>
      <OrangeGradientButton
        type="submit"
        disabled={loading}
        loading={loading}
        color="red"
        sx={{
          width: "100%",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        {!loading && renderBtnContent()}
      </OrangeGradientButton>
    </div>
  );
};
