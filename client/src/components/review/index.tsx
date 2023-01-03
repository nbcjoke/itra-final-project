import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import ReactStars from "react-stars";

import { RateService } from "../../services/rateService";
import { ReviewModel } from "../../models/reviewModel";
import { Typography, Paper, Alert } from "@mui/material";

import styles from "./style.module.css";

interface ReviewProps {
  review: ReviewModel;
}

export const Review: React.FC<ReviewProps> = ({ review }) => {
  const [rate, setRate] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    // getRate();
  }, []);

  const ratingChanged = async (newRate: number) => {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    await RateService.addRate(user, review, newRate);
  };

  const getRate = async () => {
    const response = await RateService.getRate();
    console.log(response.data);
    setRate(response.data);
  };

  //   const addRate = async () => {
  //     const user = JSON.parse("user");
  //     const response: any = await RateService.addRate(user, review, rate);
  //     // setReviews([...reviews, ...response]);
  //   };

  console.log(review.userRate);

  return (
    <Paper className={styles.review} key={review._id}>
      <div className={styles.header}>
        <div className={styles.rateContainer}>
          <h2>{review.name}</h2>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={40}
            value={review.userRate}
            color2={"#ffd700"}
            half={true}
          />
        </div>
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
            {t("home.title")}:
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
