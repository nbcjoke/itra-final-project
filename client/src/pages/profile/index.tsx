import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ReviewService } from "../../services/reviewService";
import { ReviewModel } from "../../models/reviewModel";
import { AddReview } from "../../components/addReview";
import {
  Typography,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { Delete, Create } from "@mui/icons-material";

import styles from "./style.module.css";
import { useParams } from "react-router-dom";

export const Profile: FC = () => {
  const [reviews, setReviews] = useState([] as ReviewModel[]);
  const [review, setReview] = useState<ReviewModel>();
  const { t } = useTranslation();

  const { userId }: any = useParams();

  useEffect(() => {
    fetchUserReviews();
  }, []);

  const fetchUserReviews = async () => {
    const response = await ReviewService.getUserReviews(userId);
    setReviews(response.data);
  };

  const deleteReview = async (id: string) => {
    await ReviewService.deleteUserReview(id);
    setReviews(reviews.filter((review) => review._id !== id));
  };

  const updateReview = async (review: ReviewModel) => {
    setReview(review);
  };

  const cancelEdit = () => {
    setReview(undefined);
  };

  const tableCells = ["id", "name", "delete", "change"];

  return (
    <div className={styles.container}>
      <Typography variant="h2">{t("profile.title")}</Typography>
      {reviews.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableCells.map((cell) => {
                  return (
                    <TableCell key={cell} align="center">
                      {t(`table.${cell}`)}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.map((review) => (
                <TableRow
                  key={review._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{review._id}</TableCell>
                  <TableCell align="center">
                    <Link to={`/review/${review._id}`}>{review.name}</Link>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      sx={{ ml: 1 }}
                      onClick={() => deleteReview(review._id)}
                      color="inherit"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      sx={{ ml: 1 }}
                      onClick={() => updateReview(review)}
                      color="inherit"
                    >
                      <Create />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h4">No Reviews</Typography>
      )}
      <div>
        <AddReview review={review} cancelEdit={cancelEdit} />
      </div>
    </div>
  );
};
