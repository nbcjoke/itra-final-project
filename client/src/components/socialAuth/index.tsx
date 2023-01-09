import react from "react";

import { Button } from "@mui/material";
import { Google, LinkedIn, GitHub } from "@mui/icons-material";

import styles from "./style.module.css";

export const SocialAuth = () => {
  const linkedin = () => {
    window.open("/auth/linkedin", "_self");
  };

  const github = () => {
    window.open("/auth/github", "_self");
  };

  const google = () => {
    window.open("/auth/google", "_self");
  };

  return (
    <div className={styles.socialAuthContainer}>
      <Button variant="contained" endIcon={<Google />} onClick={google}>
        Google
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
