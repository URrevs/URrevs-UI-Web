import { useTheme } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import { CircularProgress, Typography } from "@mui/material";

import OrangeGradientButton from "../../Components/Buttons/OrangeGradientButton";

export const FormSubmitButton = ({
  submitLabel,

  loading = false,
}) => {
  const theme = useTheme();
  // const renderBtnContent = () => (
  //   <Box
  //     sx={{
  //       display: "flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       textAlign: "center",
  //     }}
  //   ></Box>
  // );
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        marginTop: "20px",
      }}
    >
      <OrangeGradientButton
        style={{ width: "100%" }}
        type="submit"
        disabled={loading}
        startIcon={
          loading ? (
            <CircularProgress size={20} sx={{ color: "#fff" }} />
          ) : (
            <AddIcon
              sx={{
                color: theme.palette.defaultRedBtnIconColor,
                fontSize: "28px",
              }}
            />
          )
        }
        color="red"
      >
        <Typography variant="S18W700Cffffff">{submitLabel}</Typography>
      </OrangeGradientButton>
    </div>
  );
};
