import React from "react";
import { CommentBody } from "./CommentBody";

export const Comment = (props) => {
  return (
    <div>
      <CommentBody {...props} buttons={["إعجاب", "رد"]}></CommentBody>
    </div>
  );
};
