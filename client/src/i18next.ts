import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
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
          change: "Update",
          showMore: "Show More",
          reset: "Reset",
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
          changeReview: "Change review",
          nameOfReview: "Name of review",
          name: "Name",
          groups: "Group",
          group: {
            cinema: "Cinema",
            game: "Games",
            book: "Books",
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
        reviewDetails: {
          title: "Review Details",
          comment: "Comment...",
          button: "Send Comment",
        },
        admin: "Admin",
        homePage: "Home",
        noReviews: "No Reviews Yet",
        table: {
          id: "Id",
          name: "Name",
          delete: "Delete",
          change: "Change",
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
          change: "Обновить",
          showMore: "Загрузить Еще",
          reset: "Обновить",
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
          changeReview: "Изменить обзор",
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
        reviewDetails: {
          title: "Детали Обзора",
          comment: "Комментарий...",
          button: "Отправить Комментарий",
        },
        admin: "Админ",
        homePage: "Главная",
        noReviews: "Нет обзоров",
        table: {
          id: "Идентификатор",
          name: "Название",
          delete: "Удалить",
          change: "Изменить",
        },
      },
    },
  },
});

export default i18n;
