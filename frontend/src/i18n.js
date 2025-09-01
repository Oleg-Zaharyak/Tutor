import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Англ
import { en } from "./assets/locales/en/index";

// Укр
import { uk } from "./assets/locales/uk/index";

const resources = { en, uk };

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    defaultNS: "common", // дефолтний namespace
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
