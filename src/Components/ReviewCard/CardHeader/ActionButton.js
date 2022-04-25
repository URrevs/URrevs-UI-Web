import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ActionButton = (props) => {
  return (
    <IconButton aria-label="settings">
      <MoreVertIcon />
    </IconButton>
  );
};

export default ActionButton;
