import { FC, useEffect, useState } from "react";
import { TagCloud } from "react-tagcloud";
import { useTranslation } from "react-i18next";

import { TagService } from "../../services/tagService";
import { ReviewService } from "../../services/reviewService";
import { Review } from "../../components/review";
import { ReviewModel } from "../../models/reviewModel";
import { TagModel } from "../../models/tagsModel";
import { Typography, Paper, Button, Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import styles from "./style.module.css";

export const Home: FC = () => {
  const [tags, setTags] = useState<TagModel[]>([]);
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [mostRatedReviews, setMostRatedReviews] = useState<ReviewModel[]>([]);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(1);
  const [tab, setTab] = useState("1");

  const { t } = useTranslation();

  useEffect(() => {
    const fetchTags = async () => {
      const response: any = await TagService.getTags();
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

  useEffect(() => {
    const fetchReviews = async () => {
      const response: any = await ReviewService.getReviews(
        limit,
        offset,
        "averageRate"
      );
      setMostRatedReviews([...reviews, ...response]);
    };

    fetchReviews();
  }, []);

  const handleReset = () => {
    setReviews([]);
    setOffset(1);
    window.scrollTo(0, 0);
  };

  const tabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <div className={styles.container}>
      <Typography variant="h2">{t("home.home")}</Typography>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={tabChange}
            aria-label="lab API tabs example"
            style={{ justifyContent: "center" }}
          >
            <Tab label={t("home.cloud")} value="1" />
            <Tab label={t("home.latest")} value="2" />
            <Tab label={t("home.mostRated")} value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
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
        </TabPanel>
        <TabPanel value="2">
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
        </TabPanel>
        <TabPanel value="3">
          <Typography variant="h4" className={styles.title}>
            {t("home.latest")}
          </Typography>
          <div className={styles.reviewsContainer}>
            {mostRatedReviews?.map((review) => {
              return <Review review={review} key={review._id} />;
            })}
          </div>
        </TabPanel>
      </TabContext>
    </div>
  );
};
