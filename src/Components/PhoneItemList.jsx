import { useTheme } from "@emotion/react";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ROUTES_NAMES from "../RoutesNames";
import { useAppSelector } from "../store/hooks";

export default function PhoneListItem({
  title,
  id,
  verificationIcon,
  verificationRatio,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const textContainer = useAppSelector((state) => state.language.textContainer);

  return (
    <React.Fragment key={id}>
      <ListItem sx={{ padding: 0, margin: 0, lineHeight: 0 }}>
        <ListItemButton
          sx={{
            padding: 0,
            padding: "0 12px",
          }}
          onClick={() => {
            navigate(
              `/${ROUTES_NAMES.PHONE_PROFILE}/${ROUTES_NAMES.SPECS}?pid=${id}`
            );
          }}
        >
          <ListItemIcon>
            <SmartphoneRoundedIcon sx={{ fontSize: 40 }} />
          </ListItemIcon>
          <div style={{ padding: "12px 6px" }}>
            <span>
              <Typography
                style={{
                  ...theme.typography.S20W700C050505,
                  lineHeight: 1,
                }}
              >
                {title}
                {verificationIcon(verificationRatio)}
              </Typography>
            </span>

            <Typography
              style={{
                ...theme.typography.S18W400C65676B,
              }}
            >
              {textContainer.smartphone}
            </Typography>
          </div>
        </ListItemButton>
      </ListItem>
      <Divider sx={{ padding: 0, color: theme.palette.divider }} />
    </React.Fragment>
  );
}
