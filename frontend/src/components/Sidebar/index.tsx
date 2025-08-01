import { FC, useCallback } from "react";
import styles from "./styles.module.scss";

import MenuButton from "../MenuButton";
import { Tooltip } from "react-tooltip";

import { toggleExpandMenu } from "../../store/slices/appUISlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useTranslation } from "react-i18next";

import {
  IoCalendarOutline,
  IoChatbubblesOutline,
  IoGameControllerOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import {
  TbChalkboard,
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import { GoGear } from "react-icons/go";
import { MdOutlineQueryStats } from "react-icons/md";
import { LuFileSpreadsheet, LuLayoutDashboard } from "react-icons/lu";

const menuItems = [
  {
    titleKey: "menu.title-dashboard",
    url: "/dashboard",
    Icon: LuLayoutDashboard,
  },
  {
    titleKey: "menu.title-student",
    url: "/dashboard/students",
    Icon: IoPeopleOutline,
  },
  {
    titleKey: "menu.title-calendar",
    url: "/dashboard/calendar",
    Icon: IoCalendarOutline,
  },
  {
    titleKey: "menu.title-chats",
    url: "/dashboard/chats",
    Icon: IoChatbubblesOutline,
  },
  {
    titleKey: "menu.title-whiteboards",
    url: "/dashboard/whiteboards",
    Icon: TbChalkboard,
  },
  {
    titleKey: "menu.title-statistic",
    url: "/dashboard/statistic",
    Icon: MdOutlineQueryStats,
  },
  {
    titleKey: "menu.title-files",
    url: "/dashboard/files",
    Icon: LuFileSpreadsheet,
  },
  {
    titleKey: "menu.title-quizzes",
    url: "/dashboard/quizzes",
    Icon: IoGameControllerOutline,
  },
  { titleKey: "menu.title-settings", url: "/dashboard/settings", Icon: GoGear },
];

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
          {menuItems.map(({ titleKey, url, Icon }) => (
            <MenuButton
              key={url}
              title={t(titleKey)}
              url={url}
              Icon={Icon}
              expandMenu={expandMenu}
            />
          ))}
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
