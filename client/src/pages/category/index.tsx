import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ReviewModel } from "../../models/reviewModel";
import { ReviewService } from "../../services/reviewService";
import { Review } from "../../components/review";
import { Typography } from "@mui/material";

import styles from "./style.module.css";

export const Category = () => {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);

  const { category }: any = useParams();

  const { t } = useTranslation();

  useEffect(() => {
    fetchReviewsByCategory();
  }, [category]);

  const fetchReviewsByCategory = async () => {
    const response = await ReviewService.getReviews(10, 1, undefined, category);
    setReviews(response);
  };

  return (
    <div className={styles.container}>
      {reviews.length ? (
        <>
          <div className={styles.reviewsContainer}>
            {reviews.map((review) => {
              return <Review review={review} key={review._id} />;
            })}
          </div>
        </>
      ) : (
        <Typography variant="h4">{t("noReviews")}</Typography>
      )}
    </div>
  );
};
