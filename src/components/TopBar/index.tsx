import { FC, useCallback } from "react";
import styles from "./styles.module.scss";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toggleMenu } from "../../store/slices/appUISlice";

import ThemeToggle from "../ThemeToggle";
import LanguageToggle from "../LanguageToggle";

const TopBar: FC = () => {
  const dispatch = useAppDispatch();
  const { expandMenu } = useAppSelector((state) => state.appUI);

  const hangleCollapseMenu = useCallback(
    () => dispatch(toggleMenu()),
    [dispatch]
  );

  return (
    <div className={styles.container}>
      <button className={styles.collapse_button} onClick={hangleCollapseMenu}>
        {expandMenu ? (
          <TbLayoutSidebarLeftExpand className={styles.collapse_button_icon} />
        ) : (
          <TbLayoutSidebarLeftCollapse
            className={styles.collapse_button_icon}
          />
        )}
      </button>
      <div className={styles.buttons}>
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default TopBar;
