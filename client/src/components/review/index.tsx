import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";

import { RateService } from "../../services/rateService";
import { ReviewModel } from "../../models/reviewModel";
import { Typography, Paper } from "@mui/material";

import styles from "./style.module.css";
import { API_URL } from "../../api/config";

interface ReviewProps {
  review: ReviewModel;
}

export const Review: React.FC<ReviewProps> = ({ review }) => {
  //   const [rate, setRate] = useState<number>();
  const { t } = useTranslation();

  const ratingChanged = async (newRate: number, ...args: any) => {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    await RateService.addRate(user, review, newRate);
    // setRate(newRate);
  };

  return (
    <Paper className={styles.review} key={review._id}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h2>{review.name}</h2>
          <ReactStars
            count={5}
            size={40}
            edit={false}
            value={review.averageRate}
            color2={"#19b2dc"}
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
        <Link to={`/review/${review._id}`}>
          <div className={styles.info}>
            <Typography variant="h5" className={styles.title}>
              {t("home.title")}:
            </Typography>
            <div className={styles.text}>{review.theme}</div>
          </div>
        </Link>
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
      <div className={styles.imageContainer}>
        {review.images.map((image) => (
          <img src={`${API_URL}${image}`} width={250} height={250} />
        ))}
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
      <div className={styles.rateContainer}>
        <h2>likes</h2>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={40}
          value={review.userRate}
          color2={"#ffd700"}
          half={true}
        />
      </div>
    </Paper>
  );
};
