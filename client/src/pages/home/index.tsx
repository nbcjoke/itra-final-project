import { FC, useEffect, useState } from "react";
import { TagCloud } from "react-tagcloud";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

import { TagService } from "../../services/tagService";
import { ReviewService } from "../../services/reviewService";
import { Review } from "../../components/review";
import { Typography, Paper } from "@mui/material";

import styles from "./style.module.css";
import { ReviewModel } from "../../models/reviewModel";
import { TagModel } from "../../models/tagsModel";

export const Home: FC = () => {
  const [tags, setTags] = useState<TagModel[]>([]);
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchTags = async () => {
      const response: any = await TagService.getTags();
      console.log(response);
      setTags(response);
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const response: any = await ReviewService.getReviews();
      console.log(response);
      setReviews(response);
    };

    fetchReviews();
  }, [offset]);

  return (
    <div className={styles.container}>
      <Typography variant="h2">{t("home.home")}</Typography>
      <Typography variant="h4" className={styles.title}>
        {t("home.latest")}
      </Typography>
      <div className={styles.reviewsContainer}>
        {reviews?.map((review) => {
          return <Review review={review} key={review._id} />;
        })}
      </div>
      <Typography variant="h4" className={styles.title}>
        Tag Cloud
      </Typography>
      <div>
        <TagCloud
          minSize={20}
          maxSize={30}
          tags={tags}
          className="simple-cloud"
        />
      </div>
    </div>
  );
};
