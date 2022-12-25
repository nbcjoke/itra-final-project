import { FC, useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Context } from "../../index";
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
  Autocomplete,
  Button,
} from "@mui/material";

import styles from "./style.module.css";
import { TagService } from "../../services/tagService";
import { setEmitFlags } from "typescript";

export const AddReview: FC = () => {
  const [markdownText, setMarkdownText] = useState("");
  const [tags, setTags] = useState([]);

  const { store } = useContext(Context);

  const { t } = useTranslation();

  const { formValues, handleChange } = useForm({
    name: "",
    theme: "",
    group: "",
    description: "",
    tags: [],
  });

  const contextValue = {
    markdownText,
    setMarkdownText,
  };

  const autocompleteChange = (event: any, tags: string[]) => {
    handleChange({ target: { name: "tags", value: tags } });
  };

  useEffect(() => {
    const fetchTags = async () => {
      const response: any = await TagService.getTags();
      console.log(response);
      setTags(response.map(({ name }: any) => name));
    };
    fetchTags();
  }, []);

  return (
    <div className={styles.container}>
      <Typography variant="h4">{t("profile.addReview")}</Typography>
      <TextField
        label={t("profile.nameOfReview")}
        name="name"
        variant="outlined"
        type="text"
        value={formValues.name}
        onChange={handleChange}
      />
      <TextField
        label={t("profile.name")}
        variant="outlined"
        name="theme"
        type="text"
        value={formValues.theme}
        onChange={handleChange}
      />
      <FormControl>
        <InputLabel>{t("profile.groups")}</InputLabel>
        <Select
          className={styles.select}
          value={formValues.group}
          name="group"
          label="Group"
          onChange={handleChange}
        >
          <MenuItem value="cinema">{t("profile.group.cinema")}</MenuItem>
          <MenuItem value="game">{t("profile.group.game")}</MenuItem>
          <MenuItem value="book">{t("profile.group.book")}</MenuItem>
        </Select>
      </FormControl>
      <Autocomplete
        style={{ width: "223px" }}
        multiple
        id="tags-standard"
        options={tags}
        // getOptionLabel={(option: any) => option.name}
        freeSolo
        onChange={autocompleteChange}
        renderInput={(params) => (
          <TextField
            {...params}
            name="tags"
            variant="standard"
            label="Multiple values"
            placeholder="Favorites"
          />
        )}
      />
      <MarkdownContext.Provider value={contextValue}>
        <div className={styles.markdown__container}>
          <MarkedInput />
          <ResultInput />
        </div>
      </MarkdownContext.Provider>
      <Button
        variant="contained"
        onClick={() =>
          store.createReview({ ...formValues, description: markdownText })
        }
      >
        {t("button.login")}
      </Button>
    </div>
  );
};
