import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";
import JsPDF from "jspdf";

import { RateService } from "../../services/rateService";
import { LikeService } from "../../services/likeService";
import { ReviewModel } from "../../models/reviewModel";
import { API_URL } from "../../api/config";
import { Typography, Paper, Button } from "@mui/material";

import styles from "./style.module.css";

interface ReviewProps {
  review: ReviewModel;
}

export const Review: React.FC<ReviewProps> = ({ review }) => {
  const [liked, setLiked] = useState<boolean>(review.liked);
  const [likes, setLikes] = useState<number>(review.likes);
  const { t } = useTranslation();

  const ratingChanged = async (newRate: number, ...args: any) => {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    await RateService.addRate(user, review, newRate);
  };

  const like = async () => {
    setLiked(!liked);
    await LikeService.addLike(review._id);
    if (liked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
  };

  const generatePDF = () => {
    const review = new JsPDF("portrait", "px", "a4");
    review.html(document.querySelector("#review") as HTMLElement).then(() => {
      review.save("review.pdf");
    });
  };

  return (
    <Paper className={styles.review} key={review._id}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <Link to={`/review/${review._id}`}>
            <h2 className={styles.link}>{review.name}</h2>
          </Link>
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
      <div className={styles.imageContainer}>
        {review.images.map((image) => (
          <img
            src={`${API_URL}${image}`}
            style={{ maxHeight: 250, maxWidth: 250 }}
          />
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
        <Button variant="contained" onClick={generatePDF}>
          pdf
        </Button>
        <Button variant="contained" onClick={like}>
          {liked ? "Unlike" : "Like"}
        </Button>
        <div>{likes}</div>
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
