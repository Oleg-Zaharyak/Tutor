import styles from "./App.module.scss";
import clsx from "clsx";
import i18next from "i18next";
import { useAppDispatch, useAppSelector } from "./utils/hooks";
import { toggleTheme } from "./store/slices/themeSlice";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";

// pages
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import SuccessVeryfyPage from "./pages/SuccessVeruifyPage";
import { useTranslation } from "react-i18next";
import DashboardLoyaut from "./pages/DashboardPages/DashboardLoyaut";

function App() {
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
    <div className={clsx(styles.container, styles[`${theme}_theme`])}>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardLoyaut />} />
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/success-pasword-reset" element={<SuccessVeryfyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <div className={styles.buttons}>
        <button className={styles.theme_btn} onClick={hangleClick}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
        <button className={styles.language_btn} onClick={hangleChangeLanguage}>
          {t("language-name")}
        </button>
      </div>
    </div>
  );
}

export default App;
