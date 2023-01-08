import react, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ReviewModel } from "../../models/reviewModel";
import { ReviewService } from "../../services/reviewService";
import { CommentService } from "../../services/commentService";
import { Review } from "../../components/review";
import { CommentModel } from "../../models/commentModel";
import { Comment } from "../../components/comment";
import { TextField, Typography, Button } from "@mui/material";

import styles from "./style.module.css";

export const ReviewDetails: FC = () => {
  const [review, setReview] = useState<ReviewModel>();
  const [text, setText] = useState<string>("");
  const [comments, setComments] = useState<CommentModel[]>([]);

  const { id }: any = useParams();

  const { t } = useTranslation();

  useEffect(() => {
    fetchReviewDetails(id);
    fetchComments(id);
  }, []);

  const fetchReviewDetails = async (id: string) => {
    const response = await ReviewService.getReviewDetails(id);
    setReview(response);
  };

  const fetchComments = async (id: string) => {
    const response = await CommentService.getComments(id);
    setComments(response);
  };

  const sendMessage = async () => {
    if (!review) {
      return;
    }
    await CommentService.sendComment(text, review._id);
  };

  return (
    <div>
      <Typography variant="h4" className={styles.title}>
        {t("reviewDetails.title")}
      </Typography>
      <div className={styles.reviewsContainer}>
        {review ? <Review review={review} /> : ""}
      </div>
      {comments.length ? (
        <div className={styles.commentsContainer}>
          {comments.map((comment) => {
            return <Comment comment={comment} key={comment._id} />;
          })}
        </div>
      ) : (
        <Typography variant="h5">No Comments yet</Typography>
      )}
      <div className={styles.messageContainer}>
        <TextField
          type="text"
          label={t("reviewDetails.comment")}
          variant="outlined"
          name="message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button variant="contained" onClick={sendMessage}>
          {t("reviewDetails.button")}
        </Button>
      </div>
    </div>
  );
};
