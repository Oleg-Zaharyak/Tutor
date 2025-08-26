import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toggleTheme } from "../../store/slices/themeSlice";
import styles from "./styles.module.scss";

type ThemeToggleProps = {
  bigBtn?: boolean;
};

const ThemeToggle: FC<ThemeToggleProps> = ({ bigBtn = false }) => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);

  const hangleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      className={bigBtn ? styles.theme_bigBtn : styles.theme_btn}
      onClick={hangleToggleTheme}
    >
      {bigBtn && <div className={styles.theme_bigBtn_text}>Change theme</div>}
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
