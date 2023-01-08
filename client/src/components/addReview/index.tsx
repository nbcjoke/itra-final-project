import { FC, useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactStars from "react-stars";

import { TagService } from "../../services/tagService";
import { Context } from "../../index";
import { MarkdownContext } from "../../contexts/markdownContext";
import { useForm } from "../../hooks/useForm";
import { MarkedInput } from "../markdown/markedInput";
import { ResultInput } from "../markdown/resultInput";
import {
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Autocomplete,
  Button,
  Paper,
} from "@mui/material";

import styles from "./style.module.css";
import { ImageService } from "../../services/imageService";
import { API_URL } from "../../api/config";

export const AddReview: FC = () => {
  const [markdownText, setMarkdownText] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState<string[]>([]);
  const [rate, setRate] = useState<number>();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { store } = useContext(Context);

  const { t } = useTranslation();

  const { formValues, handleChange } = useForm({
    name: "",
    theme: "",
    group: "",
    description: "",
    tags: [],
    rate: "",
  });

  const ratingChanged = (newRate: number) => {
    setRate(newRate);
  };

  const contextValue = {
    markdownText,
    setMarkdownText,
  };

  const autocompleteChange = (event: any, tags: string[]) => {
    handleChange({ target: { name: "tags", value: tags } });
  };

  const onFileSelect = async (file?: File) => {
    if (!file) {
      return;
    }
    const path = await ImageService.uploadImage(file);
    setImages([...images, path]);
  };

  const deleteFile = (imageIndex: number) => {
    const deletedImage = images.filter((image, index) => index !== imageIndex);
    setImages(deletedImage);
  };

  useEffect(() => {
    const fetchTags = async () => {
      const response: any = await TagService.getTags();
      setTags(response.map(({ name }: any) => name));
    };
    fetchTags();
  }, []);

  return (
    <Paper className={styles.container}>
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
        className={styles.autocomplete}
        multiple
        id="tags-standard"
        options={tags}
        freeSolo
        onChange={autocompleteChange}
        renderInput={(params) => (
          <TextField
            {...params}
            name="tags"
            variant="standard"
            label={t("profile.tags")}
          />
        )}
      />
      <ReactStars
        count={10}
        onChange={ratingChanged}
        value={rate}
        size={40}
        color2={"#ffd700"}
        half={false}
      />
      <input
        onChange={(e) => onFileSelect(e.target.files?.[0])}
        type="file"
        accept="image/*"
      />
      {images.map((image, index) => (
        <div key={image}>
          <img
            src={`${API_URL}${image}`}
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
          <Button onClick={() => deleteFile(index)}>delete</Button>
        </div>
      ))}
      <MarkdownContext.Provider value={contextValue}>
        <div className={styles.markdown__container}>
          <MarkedInput />
          <ResultInput />
        </div>
      </MarkdownContext.Provider>
      <Button
        className={styles.button}
        variant="contained"
        onClick={() =>
          store.createReview({
            ...formValues,
            description: markdownText,
            rate: rate,
            user: user,
            images,
          })
        }
      >
        {t("button.add")}
      </Button>
    </Paper>
  );
};
