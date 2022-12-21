import { FC } from "react";

import { Navigation } from "../navigation";
import { Paper } from "@mui/material";

import styles from "./style.module.css";

export const Header: FC = () => {
  return (
    <Paper>
      <div className={styles.header}>
        <Navigation />
      </div>
    </Paper>
  );
};
