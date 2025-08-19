import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import TopBar from "../../../components/TopBar";
import { Sidebar } from "../../../components/Sidebar";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import clsx from "clsx";

import { useAuth } from "@clerk/clerk-react";
import { setToken } from "../../../store/slices/appUISlice";

const DashboardLoyaut: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { getToken } = useAuth();

  const { expandMenu } = useAppSelector((state) => state.appUI);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(location.pathname);

  // витягую токен про користувача з бд
  useEffect(() => {
    (async () => {
      const token = await getToken();
      dispatch(setToken(token));
    })();
  }, [dispatch, getToken]);

  // закриваю меню при зміні шляху
  useEffect(() => {
    const newLocation = location.pathname;
    if (isMobileMenuOpen && currentLocation !== newLocation) {
      setCurrentLocation(newLocation);
      setMobileMenuOpen(false);
    }
  }, [currentLocation, location, isMobileMenuOpen]);

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
