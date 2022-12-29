import React from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

import { ReviewModel } from "../../models/reviewModel";
import { Typography, Paper } from "@mui/material";

import styles from "./style.module.css";

interface ReviewProps {
  review: ReviewModel;
}

export const Review: React.FC<ReviewProps> = ({ review }) => {
  const { t } = useTranslation();

  return (
    <Paper className={styles.review} key={review._id}>
      <div className={styles.header}>
        <h2>{review.name}</h2>
        <div>
          {review.tags.map((tag) => {
            return <div className={styles.text}>#{tag}</div>;
          })}
        </div>
      </div>
      <div className={styles.images}></div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <Typography variant="h5" className={styles.title}>
            {t("home.title")} {review.group}:
          </Typography>
          <div className={styles.text}>{review.theme}</div>
        </div>
        <div className={styles.info}>
          <Typography variant="h5" className={styles.title}>
            {t("home.category")}
          </Typography>
          <div className={styles.text}>{review.group}</div>
        </div>
        <div className={styles.info}>
          <Typography variant="h5" className={styles.title}>
            {t("home.rate")}
          </Typography>
          <div className={styles.text}>{review.rate}</div>
        </div>
      </div>
      <div className={styles.markdown}>
        <Typography variant="h5" className={styles.title}>
          {t("home.description")}
        </Typography>
        <div className={styles.text}>
          <ReactMarkdown
            className={styles.description}
            children={review.description}
          />
        </div>
      </div>
    </Paper>
  );
};
