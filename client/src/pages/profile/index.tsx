import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Typography } from "@mui/material";
import { AddReview } from "../../components/addReview";

export const Profile: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography variant="h2">{t("profile.title")}</Typography>
      <div>
        <AddReview />
      </div>
    </div>
  );
};
