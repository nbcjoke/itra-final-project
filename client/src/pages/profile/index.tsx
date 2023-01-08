import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

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
} from "@mui/material";

import styles from "./style.module.css";

export const Profile: FC = () => {
  const [review, setReviews] = useState([] as ReviewModel[]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchUserReviews();
  }, []);

  const fetchUserReviews = async () => {
    // let user = JSON.parse(localStorage.getItem("user") || "{}");
    const response = await ReviewService.getUserReviews();
    setReviews(response.data);
  };

  const tableCells = ["id", "name", "delete", "change"];

  return (
    <div className={styles.container}>
      <Typography variant="h2">{t("profile.title")}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {/* <Checkbox
                  checked={allSelected}
                  onChange={() => toggleAllSelection()}
                /> */}
              </TableCell>
              {tableCells.map((cell) => {
                return (
                  <TableCell key={cell} align="center">
                    {cell}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {users.map((user) => ( */}
            <TableRow
              // key={user._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">
                {/* <Checkbox
                    checked={user.selected}
                    onChange={() => toggleSelection(user)}
                  /> */}
              </TableCell>
              {/* <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user._id}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.registrationTime}</TableCell> */}
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <AddReview />
      </div>
    </div>
  );
};
