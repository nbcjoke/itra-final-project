import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Typography } from "@mui/material";
import { AddReview } from "../../components/addReview";

import styles from "./style.module.css";
import { ReviewService } from "../../services/reviewService";
import { ReviewModel } from "../../models/reviewModel";

export const Profile: FC = () => {
  const [review, setReviews] = useState([] as ReviewModel[]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchUserReviews();
  }, []);

  async function fetchUserReviews() {
    const response = await ReviewService.getUserReviews();
    setReviews(response.data);
    console.log(response.data);
  }

  return (
    <div className={styles.container}>
      <Typography variant="h2">{t("profile.title")}</Typography>
      <div>
        <AddReview />
      </div>
    </div>
  );
};
