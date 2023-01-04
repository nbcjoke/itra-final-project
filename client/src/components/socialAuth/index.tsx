import react from "react";

import { Button } from "@mui/material";
import { FacebookOutlined, LinkedIn, GitHub } from "@mui/icons-material";

import styles from "./style.module.css";

export const SocialAuth = () => {
  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  return (
    <div className={styles.socialAuthContainer}>
      <Button variant="contained" endIcon={<FacebookOutlined />}>
        Facebook
      </Button>
      <Button variant="contained" endIcon={<LinkedIn />}>
        LinkedIn
      </Button>
      <Button variant="contained" endIcon={<GitHub />} onClick={github}>
        Github
      </Button>
    </div>
  );
};
