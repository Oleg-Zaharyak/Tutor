import styles from "./styles.module.scss";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { t } = useTranslation();

  const hangleChangeLanguage = () => {
    i18next.changeLanguage(i18next.language === "en" ? "uk" : "en");
  };

  return (
    <button className={styles.language_btn} onClick={hangleChangeLanguage}>
      {t("language-name")}
    </button>
  );
};

export default LanguageToggle;
