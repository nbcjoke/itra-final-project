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
            add: "Add",
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
            markdown: {
              markdown: "Markdown Text",
              result: "Converted Text",
              title: "Name",
              category: "Category: ",
              rate: "Rate",
              description: "Description",
            },
          },
          locale: {
            locale: "Locale",
          },
          home: {
            home: "Home",
            latest: "Latest Reviews",
            cloud: "Tag Cloud",
            mostRated: "Most Rated Reviews",
            title: "Name",
            category: "Category: ",
            rate: "Rate",
            description: "Description",
          },
          divider: {
            or: "OR",
          },
        },
      },
      ru: {
        translation: {
          button: {
            logout: "Выйти",
            login: "Войти",
            signup: "Регистрация",
            add: "Добавить",
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
            markdown: {
              markdown: "Разметка",
              result: "Результат",
            },
          },
          locale: {
            locale: "Язык",
          },
          home: {
            home: "Главная Страница",
            latest: "Последние Обзоры",
            cloud: "Хранилище Тэгов",
            mostRated: "Самые Популярные Обзоры",
            title: "Название",
            category: "Категория: ",
            rate: "Рейтинг",
            description: "Описание",
          },
          divider: {
            or: "ИЛИ",
          },
        },
      },
    },
  });

export default i18n;
