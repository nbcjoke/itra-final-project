import react from "react";

import { Button } from "@mui/material";
import { Google, LinkedIn, GitHub } from "@mui/icons-material";

import styles from "./style.module.css";

export const SocialAuth = () => {
  const linkedin = () => {
    window.open("http://localhost:5000/auth/linkedin", "_self");
  };

  const github = () => {
    window.open("/auth/github", "_self");
  };

  const google = () => {
    console.log("hello");
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className={styles.socialAuthContainer}>
      <Button variant="contained" endIcon={<Google />} onClick={google}>
        Facebook
      </Button>
      <Button variant="contained" endIcon={<LinkedIn />} onClick={linkedin}>
        LinkedIn
      </Button>
      <Button variant="contained" endIcon={<GitHub />} onClick={github}>
        Github
      </Button>
    </div>
  );
};
