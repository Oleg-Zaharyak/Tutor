import { FC } from "react";
import styles from "./styles.module.scss";
import { Outlet } from "react-router-dom";
import { TopBar } from "../../../components/TopBar";
import { Sidebar } from "../../../components/Sidebar";
import { useAppSelector } from "../../../utils/hooks";
import clsx from "clsx";

const DashboardLoyaut: FC = () => {
  const { expandMenu } = useAppSelector((state) => state.appUI);
  return (
    <div className={clsx(styles.container, expandMenu && styles.open)}>
      <div className={styles.topBar}>
        <TopBar />
      </div>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.main}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLoyaut;
