import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { useForm } from "../../hooks/useForm";
import { MarkedInput } from "../markdown/markedInput";
import { ResultInput } from "../markdown/resultInput";
import { MarkdownContext } from "../../contexts/markdownContext";
import {
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

import styles from "./style.module.css";

export const AddReview: FC = () => {
  const [markdownText, setMarkdownText] = useState("");

  const { t } = useTranslation();

  const { formValues, handleChange } = useForm({
    nameOfReview: "",
    name: "",
    group: "",
    tags: "",
  });

  const contextValue = {
    markdownText,
    setMarkdownText,
  };

  return (
    <div className={styles.container}>
      <Typography variant="h4">{t("profile.addReview")}</Typography>
      <TextField
        label={t("profile.nameOfReview")}
        variant="outlined"
        type="text"
      />
      <TextField label={t("profile.name")} variant="outlined" type="text" />
      <FormControl>
        <InputLabel>{t("profile.groups")}</InputLabel>
        <Select
          className={styles.select}
          //   value={age}
          label="Age"
          //   onChange={handleChange}
        >
          <MenuItem value="cinema">{t("profile.group.cinema")}</MenuItem>
          <MenuItem value="game">{t("profile.group.game")}</MenuItem>
          <MenuItem value="book">{t("profile.group.book")}</MenuItem>
        </Select>
      </FormControl>
      <TextField label={t("profile.tags")} variant="outlined" type="text" />
      <MarkdownContext.Provider value={contextValue}>
        <div className={styles.markdown__container}>
          <MarkedInput />
          <ResultInput />
        </div>
      </MarkdownContext.Provider>
    </div>
  );
};
