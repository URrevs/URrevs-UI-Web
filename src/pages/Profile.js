import React from "react";
import { useAppSelector } from "../store/hooks";
import { useSearchParams } from "react-router-dom";
import CurrentUserProfilePage from "./CurrentUserProfile";
import OtherUserProfilePage from "./OtherUserProfile";

export default function Profile() {
  const currentUserId = useAppSelector((state) => state.auth.uid);

  const [searchParams, setSearchParams] = useSearchParams();
  const paramId = searchParams.get("uid");

  if (paramId === currentUserId || paramId === null) {
    return <CurrentUserProfilePage />;
  } else {
    return <OtherUserProfilePage uid={paramId} />;
  }
}
