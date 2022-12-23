import { FC, useContext } from "react";
import ReactMarkdown from "react-markdown";

import { MarkdownContext } from "../../contexts/markdownContext";
import { Typography } from "@mui/material";

import styles from "./style.module.css";

export const ResultInput = () => {
  const { markdownText } = useContext(MarkdownContext);

  return (
    <div className={styles.result__container}>
      <Typography className={styles.title} variant="h5">
        Converted Text
      </Typography>
      <div className={styles.resultArea}>
        <ReactMarkdown children={markdownText} />
      </div>
    </div>
  );
};
