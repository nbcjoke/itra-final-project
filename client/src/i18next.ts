import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  //   .use(Backend)
  //   .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: localStorage.getItem("locale") || "en",
    debug: true,

    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          button: {
            logout: "Logout",
            login: "Login",
            signup: "Signup",
          },
          login: {
            email: "Email",
            password: "Password",
          },
          signup: {
            email: "Email",
            password: "Password",
            name: "Name",
          },
          profile: {
            title: "Profile",
            addReview: "Add review",
            nameOfReview: "Name of review",
            name: "Name",
            groups: "Group",
            group: {
              cinema: "Cinema",
              game: "Game",
              book: "Book",
            },
            tags: "tags",
          },
          locale: {
            locale: "Locale",
          },
        },
      },
      ru: {
        translation: {
          button: {
            logout: "Выйти",
            login: "Войти",
            signup: "Регистрация",
          },
          login: {
            email: "Адрес почты",
            password: "Пароль",
          },
          signup: {
            email: "Адрес почты",
            password: "Пароль",
            name: "Имя",
          },
          profile: {
            title: "Профиль",
            addReview: "Добавить обзор",
            nameOfReview: "Название обзора",
            name: "Название",
            groups: "Группа",
            group: {
              cinema: "Кино",
              game: "Игры",
              book: "Книги",
            },
            tags: "Тэги",
          },
          locale: {
            locale: "Язык",
          },
        },
      },
    },
  });

export default i18n;
