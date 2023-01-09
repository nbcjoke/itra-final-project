import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { MarkdownContext } from "../../contexts/markdownContext";
import { TextareaAutosize, Typography } from "@mui/material";

import styles from "./style.module.css";

export const MarkedInput = () => {
  const { setMarkdownText, markdownText } = useContext(MarkdownContext);

  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownText(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Typography className={styles.title} variant="h5">
        {t("profile.markdown.markdown")}
      </Typography>
      <TextareaAutosize
        aria-label="minimum height"
        minRows={20}
        placeholder={t("profile.markdown.markdown") as string}
        className={styles.textarea}
        onChange={handleChange}
        value={markdownText}
      />
    </div>
  );
};
