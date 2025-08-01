import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toggleTheme } from "../../store/slices/themeSlice";
import styles from "./styles.module.scss";

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);

  const hangleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <button className={styles.theme_btn} onClick={hangleToggleTheme}>
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
