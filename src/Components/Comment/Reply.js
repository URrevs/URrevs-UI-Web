import React from "react";
import { CommentBody } from "./CommentBody";
export const Reply = (props) => {
  return (
    <div>
      <CommentBody {...props} avatar="32px" buttons={["إعجاب"]}></CommentBody>
    </div>
  );
};
