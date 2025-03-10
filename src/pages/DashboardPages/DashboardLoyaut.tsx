import { FC } from "react";
import styles from "./styles.module.scss";
import { Outlet } from "react-router-dom";

const DashboardLoyaut: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}></div>
      <div className={styles.navLink}>
        
      </div>
      <div className={styles.main}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLoyaut;
