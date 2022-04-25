import { Avatar } from "@mui/material";
import { blue } from "@mui/material/colors";

const CircleAvatar = ({ userAvatar, avatarRadius }) => {
  return (
    <Avatar
      sx={{
        bgcolor: blue[500],
        width: `${avatarRadius}px`,
        height: `${avatarRadius}px`,
      }}
      aria-label="recipe"
    >
      {userAvatar === null || userAvatar === "" ? null : (
        <img
          src={userAvatar}
          style={{
            width: `${avatarRadius}px`,
            height: `${avatarRadius}px`,
          }}
        />
      )}
    </Avatar>
  );
};

export default CircleAvatar;
