import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

import { MarkdownContext } from "../../contexts/markdownContext";
import { Typography } from "@mui/material";

import styles from "./style.module.css";

export const ResultInput = () => {
  const { t } = useTranslation();

  const { markdownText } = useContext(MarkdownContext);

  return (
    <div className={styles.result__container}>
      <Typography className={styles.title} variant="h5">
        {t("profile.markdown.result")}
      </Typography>
      <div className={styles.resultArea}>
        <ReactMarkdown children={markdownText} />
      </div>
    </div>
  );
};
