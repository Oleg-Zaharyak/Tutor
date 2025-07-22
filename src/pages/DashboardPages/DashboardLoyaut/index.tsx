import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { Outlet } from "react-router-dom";
import TopBar from "../../../components/TopBar";
import { Sidebar } from "../../../components/Sidebar";
import { useAppSelector } from "../../../hooks/hooks";
import clsx from "clsx";

const DashboardLoyaut: FC = () => {
  const { expandMenu } = useAppSelector((state) => state.appUI);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div
      className={clsx(
        styles.container,
        expandMenu && styles.open,
        isMobileMenuOpen && styles.mobileMenuOpen
      )}
    >
      <div className={styles.topBar}>
        <TopBar
          isMobileMenuOpen={isMobileMenuOpen}
          onBurgerClick={() => setMobileMenuOpen((prev) => !prev)}
        />
        {/* <TopBar /> */}
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
