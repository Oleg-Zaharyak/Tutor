import { Outlet } from "react-router-dom";
import styles from "./styles.module.scss";

import ThemeToggle from "../../../components/ThemeToggle";
import LanguageToggle from "../../../components/LanguageToggle";

const AuthLoyaut = () => {
  return (
    <div className={styles.loyaut_container}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Outlet></Outlet>
        </div>
      </div>
      <div className={styles.buttons}>
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  );
};
export default AuthLoyaut;
