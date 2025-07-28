import { FC, useCallback } from "react";
import styles from "./styles.module.scss";
import MenuButton from "../MenuButton";
import { RiDashboardLine } from "react-icons/ri";
import {
  IoCalendarOutline,
  IoChatbubblesOutline,
  IoGameControllerOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toggleExpandMenu } from "../../store/slices/appUISlice";
import {
  TbChalkboard,
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import { GoGear } from "react-icons/go";
import { MdOutlineQueryStats } from "react-icons/md";
import { LuFileSpreadsheet } from "react-icons/lu";
import { Tooltip } from "react-tooltip";

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
          <MenuButton
            title={t("menu.title-calendar")}
            url="/dashboard/calendar"
            Icon={IoCalendarOutline}
            expandMenu={expandMenu}
          />
          <MenuButton
            title={t("menu.title-chats")}
            url="/dashboard/chats"
            Icon={IoChatbubblesOutline}
            expandMenu={expandMenu}
          />
          <MenuButton
            title={t("menu.title-whiteboards")}
            url="/dashboard/whiteboards"
            Icon={TbChalkboard}
            expandMenu={expandMenu}
          />
          <MenuButton
            title={t("menu.title-statistic")}
            url="/dashboard/statistic"
            Icon={MdOutlineQueryStats}
            expandMenu={expandMenu}
          />
          <MenuButton
            title={t("menu.title-files")}
            url="/dashboard/files"
            Icon={LuFileSpreadsheet}
            expandMenu={expandMenu}
          />
          <MenuButton
            title={t("menu.title-quizzes")}
            url="/dashboard/quizzes"
            Icon={IoGameControllerOutline}
            expandMenu={expandMenu}
          />
          <MenuButton
            title={t("menu.title-settings")}
            url="/dashboard/settings"
            Icon={GoGear}
            expandMenu={expandMenu}
          />
        </div>
        <div className={styles.collapse_button_container}>
          <button
            className={styles.collapse_button}
            onClick={hangleCollapseMenu}
            data-tooltip-id="my-tooltip-expand"
            data-tooltip-content={
              expandMenu ? t("menu.expand") : t("menu.collapse")
            }
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
            <Tooltip
              className={styles.tooltip}
              id="my-tooltip-expand"
              place="right"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
