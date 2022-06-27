import React from "react";
import PostingScreen from "./PostingScreen/PostingScreen";

const ReviewPostingScreen = () => {
  const [value, setValue] = React.useState(0);
  return (
    <div>
      <PostingScreen value={value} setValue={setValue}></PostingScreen>
    </div>
  );
};
export default ReviewPostingScreen;
