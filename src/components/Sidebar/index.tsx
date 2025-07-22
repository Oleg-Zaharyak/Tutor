import { FC, useCallback } from "react";
import styles from "./styles.module.scss";
import MenuButton from "../MenuButton";
import { RiDashboardLine } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toggleExpandMenu } from "../../store/slices/appUISlice";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";

export const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { expandMenu } = useAppSelector((state) => state.appUI);

  const hangleCollapseMenu = useCallback(
    () => dispatch(toggleExpandMenu()),
    [dispatch]
  );

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.menu_button}>
          <MenuButton
            title={t("menu.title-dashboard")}
            url="/dashboard"
            Icon={RiDashboardLine}
            expandMenu={expandMenu}
          />
          <MenuButton
            title={t("menu.title-student")}
            url="/dashboard/students"
            Icon={IoPeopleOutline}
            expandMenu={expandMenu}
          />
        </div>
        <div className={styles.collapse_button_container}>
          <button
            className={styles.collapse_button}
            onClick={hangleCollapseMenu}
          >
            {expandMenu ? (
              <TbLayoutSidebarLeftExpand
                className={styles.collapse_button_icon}
              />
            ) : (
              <TbLayoutSidebarLeftCollapse
                className={styles.collapse_button_icon}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
