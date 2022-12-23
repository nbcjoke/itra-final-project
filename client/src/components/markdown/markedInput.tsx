import { FC, useContext } from "react";

import { TextareaAutosize, Typography } from "@mui/material";

import styles from "./style.module.css";
import { MarkdownContext } from "../../contexts/markdownContext";

export const MarkedInput = () => {
  const { setMarkdownText } = useContext(MarkdownContext);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownText(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Typography className={styles.title} variant="h5">
        Markdown Text
      </Typography>
      <TextareaAutosize
        aria-label="minimum height"
        minRows={20}
        placeholder="Markdown text"
        className={styles.textarea}
        onChange={handleChange}
      />
    </div>
  );
};
