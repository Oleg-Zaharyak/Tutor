import { Outlet } from "react-router-dom";
import styles from "./styles.module.scss";
import i18next from "i18next";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { toggleTheme } from "../../../store/slices/themeSlice";
import { useTranslation } from "react-i18next";

export const AuthLoyaut = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { theme } = useAppSelector((state) => state.theme);

  const hangleClick = () => {
    dispatch(toggleTheme());
  };

  const hangleChangeLanguage = () => {
    i18next.changeLanguage(i18next.language === "en" ? "uk" : "en");
  };
  return (
    <>
      <Outlet></Outlet>
      <div className={styles.buttons}>
        <button className={styles.theme_btn} onClick={hangleClick}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
        <button className={styles.language_btn} onClick={hangleChangeLanguage}>
          {t("language-name")}
        </button>
      </div>
    </>
  );
};
