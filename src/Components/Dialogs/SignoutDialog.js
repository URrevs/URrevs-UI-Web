import { useTheme } from "@emotion/react";
import { Box, Checkbox, Typography } from "@mui/material";
import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import BasicButton from "../Buttons/BasicButton";
import { DialogTemplate } from "./DialogTemplate";
export const SignoutDialog = ({ handleClose }) => {
  const [checked, setChecked] = useState(false);
  const theme = useTheme();
  const textContainer = useSelector((state) => state.language.textContainer);
  const handleChecked = () => {
    setChecked(!checked);
  };
  return (
    <React.Fragment>
      <DialogTemplate
        title={textContainer.sureToLogOut}
        handleClose={handleClose}
      >
        <Box
          sx={{
            display: "flex",

            padding: "0px 0px 20px 0px",
          }}
        >
          <Checkbox
            icon={
              <CheckBoxOutlineBlankRoundedIcon
                sx={{
                  color: theme.palette.checkbox.borderColor,
                  fontSize: "30px ",
                }}
              />
            }
            sx={{
              "&.MuiCheckbox-colorPrimary": {
                // color: theme.palette.checkbox.borderColor,
              },
              ".muiltr-i4bv87-MuiSvgIcon-root": {
                fontSize: "30px ",
              },
              ".muirtl-i4bv87-MuiSvgIcon-root": {
                fontSize: "30px ",
              },
            }}
            checked={checked}
            onChange={handleChecked}
          />
          <Typography sx={{}} variant="S16W500C050505">
            {textContainer.logOutFromAllDevices}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingBottom: "12px",
          }}
        >
          <BasicButton>
            <BasicButton sx={{ marginLeft: "22px" }}>
              <Typography variant="S16W800CE41D1D">
                {textContainer.logOut}
              </Typography>
            </BasicButton>
            <Typography onClick={handleClose} variant="S16W800C050505">
              {textContainer.cancel}
            </Typography>
          </BasicButton>
        </Box>
      </DialogTemplate>
    </React.Fragment>
  );
};
