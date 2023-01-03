import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ReviewModel } from "../../models/reviewModel";
import { ReviewService } from "../../services/reviewService";
import { Review } from "../../components/review";

import styles from "./style.module.css";

export const Category = () => {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);

  const { category }: any = useParams();

  useEffect(() => {
    fetchReviewsByCategory();
  }, [category]);

  const fetchReviewsByCategory = async () => {
    const response = await ReviewService.getReviews(10, 1, category);
    // console.log(response.data);
    setReviews(response);
  };

  return (
    <div className={styles.container}>
      <div className={styles.reviewsContainer}>
        {reviews.map((review) => {
          return <Review review={review} key={review._id} />;
        })}
      </div>
    </div>
  );
};
