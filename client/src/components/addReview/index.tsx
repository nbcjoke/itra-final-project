import { FC, useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactStars from "react-stars";

import { TagService } from "../../services/tagService";
import { Context } from "../../index";
import { MarkdownContext } from "../../contexts/markdownContext";
import { useForm } from "../../hooks/useForm";
import { ImageService } from "../../services/imageService";
import { API_URL } from "../../api/config";
import { ReviewModel } from "../../models/reviewModel";
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
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import styles from "./style.module.css";

interface Props {
  review?: ReviewModel;
  cancelEdit: () => void;
}

export const AddReview: FC<Props> = ({ review, cancelEdit }) => {
  const [markdownText, setMarkdownText] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState<string[]>([]);
  const [rate, setRate] = useState<number>();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { store } = useContext(Context);

  const { t } = useTranslation();

  const { formValues, handleChange, handleReset } = useForm({
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

  useEffect(() => {
    if (review) {
      handleChange(review);
      //   setTags;
      setMarkdownText(review.description);
      setRate(review.rate);
      setImages(review.images);
    }
  }, [review]);

  const autocompleteChange = (event: any, tags: string[]) => {
    handleChange({ tags });
  };

  const inputChange = (event: any) => {
    const { name, value } = event.target;
    handleChange({ [name]: value });
  };

  const onFileSelect = async (file?: File) => {
    if (!file) {
      return;
    }
    const path = await ImageService.uploadImage(file);
    setImages([...images, path]);
  };

  const deleteFile = (imageIndex: number) => {
    const deletedImage = images.filter((_, index) => index !== imageIndex);
    setImages(deletedImage);
  };

  useEffect(() => {
    const fetchTags = async () => {
      const response = await TagService.getTags();
      setTags(response.map(({ name }: any) => name));
    };
    fetchTags();
  }, []);

  const handleSave = () => {
    if (review) {
      store.updateUserReview(
        {
          ...formValues,
          description: markdownText,
          rate: rate,
          user: user,
          images,
        },
        review._id
      );
      handleReset();
      setMarkdownText("");
      setRate(0);
      setImages([]);
      cancelEdit();
      return;
    }
    store.createReview({
      ...formValues,
      description: markdownText,
      rate: rate,
      user: user,
      images,
    });
  };

  return (
    <Paper className={styles.container}>
      {review ? (
        <Typography variant="h4">{t("profile.changeReview")}</Typography>
      ) : (
        <Typography variant="h4">{t("profile.addReview")}</Typography>
      )}
      <TextField
        label={t("profile.nameOfReview")}
        name="name"
        variant="outlined"
        type="text"
        value={formValues.name}
        onChange={inputChange}
      />
      <TextField
        label={t("profile.name")}
        variant="outlined"
        name="theme"
        type="text"
        value={formValues.theme}
        onChange={inputChange}
      />
      <FormControl>
        <InputLabel>{t("profile.groups")}</InputLabel>
        <Select
          className={styles.select}
          value={formValues.group}
          name="group"
          label="Group"
          onChange={inputChange}
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
        value={formValues.tags}
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
      <div className={styles.imagesContainer}>
        {images.map((image, index) => (
          <div key={image} className={styles.imageContainer}>
            <img
              src={`${API_URL}${image}`}
              style={{
                maxWidth: "250px",
                maxHeight: "250px",
              }}
            />
            <div className={styles.deleteFile}>
              <IconButton
                sx={{ ml: 1 }}
                onClick={() => deleteFile(index)}
                color="inherit"
              >
                <Delete />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
      <MarkdownContext.Provider value={contextValue}>
        <div className={styles.markdown__container}>
          <MarkedInput />
          <ResultInput />
        </div>
      </MarkdownContext.Provider>
      <Button
        className={styles.button}
        variant="contained"
        onClick={() => handleSave()}
      >
        {review ? t("button.change") : t("button.add")}
      </Button>
    </Paper>
  );
};
