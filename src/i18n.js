import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./assets/locales/en/translation.json";
import translationUK from "./assets/locales/uk/translation.json";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: translationEN,
  },
  uk: {
    translation: translationUK,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
