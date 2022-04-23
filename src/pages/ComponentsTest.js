import { Fragment } from "react";
import { AuthenticationButton } from "../Components/Authentication/AuthenticationButton";
import { GoogleButton } from "../Components/Authentication/GoogleButton";
import LeaderboardEntry from "../Components/Leaderboard/LeaderboardEntry";

const ComponentsTest = (props) => {
  return (
    <Fragment>
      <GoogleButton />
      <br />
      <LeaderboardEntry />
      <div>dasdna </div>
      <div>dasdna </div>
      <div>dasdna </div>
      <div>dasdna </div>
      <div>dasdna </div>
    </Fragment>
  );
};

export default ComponentsTest;
