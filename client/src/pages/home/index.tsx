import { FC, useEffect, useState } from "react";
import { TagCloud } from "react-tagcloud";
import { useTranslation } from "react-i18next";

import { TagService } from "../../services/tagService";
import { ReviewService } from "../../services/reviewService";
import { Review } from "../../components/review";
import { Typography, Paper, Button } from "@mui/material";

import styles from "./style.module.css";
import { ReviewModel } from "../../models/reviewModel";
import { TagModel } from "../../models/tagsModel";

export const Home: FC = () => {
  const [tags, setTags] = useState<TagModel[]>([]);
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(1);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchTags = async () => {
      const response: any = await TagService.getTags();
      // setTags(
      //   response.map(({ name, count, _id }: any) => {
      //     return { value: name, count, _id };
      //   })
      // );
      setTags(
        response.map((tag: TagModel) => {
          return { ...tag, value: tag.name };
        })
      );
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const response: any = await ReviewService.getReviews(limit, offset);
      setReviews([...reviews, ...response]);
    };

    fetchReviews();
  }, [offset]);

  const handleReset = () => {
    setReviews([]);
    setOffset(1);
    window.scrollTo(0, 0);
  };

  const disabled = () => {};

  return (
    <div className={styles.container}>
      <Typography variant="h2">{t("home.home")}</Typography>
      <Typography variant="h4" className={styles.title}>
        Tag Cloud
      </Typography>
      <Paper className={styles.tagCloud}>
        <TagCloud
          minSize={20}
          maxSize={30}
          tags={tags}
          className="simple-cloud"
        />
      </Paper>
      <Typography variant="h4" className={styles.title}>
        {t("home.latest")}
      </Typography>
      <div className={styles.reviewsContainer}>
        {reviews?.map((review) => {
          return <Review review={review} key={review._id} />;
        })}
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={() => setOffset(offset + 1)} variant="contained">
          Show More
        </Button>
        <Button onClick={handleReset} variant="contained">
          Reset
        </Button>
      </div>
    </div>
  );
};
