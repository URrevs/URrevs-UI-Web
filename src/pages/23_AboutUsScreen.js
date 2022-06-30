import React from "react";
import { useAppSelector } from "../store/hooks";

export const AboutUsScreen = () => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  return <div>عنا</div>;
};
