import react, { FC } from "react";

import { CommentModel } from "../../models/commentModel";
import { Paper } from "@mui/material";

import styles from "./style.module.css";

interface Props {
  comment: CommentModel;
}

export const Comment: FC<Props> = ({ comment }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <Paper className={styles.commentContainer} key={comment._id}>
      <div>{comment.user.name}</div>
      <div>{comment.text}</div>
    </Paper>
  );
};
