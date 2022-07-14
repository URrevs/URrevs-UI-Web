import { Avatar } from "@mui/material";
import { blue } from "@mui/material/colors";

const CircleAvatar = ({ userAvatar, avatarRadius, userName }) => {
  return (
    <Avatar
      src={userAvatar}
      sx={{
        bgcolor: blue[500],
        width: `${avatarRadius}px`,
        height: `${avatarRadius}px`,
      }}
      aria-label="user picture"
      alt={`${userName} profile picture`}
    >
      <Avatar />
    </Avatar>
  );
};

export default CircleAvatar;
