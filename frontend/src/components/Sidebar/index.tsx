import { FC, useCallback } from "react";
import styles from "./styles.module.scss";

import MenuButton from "../MenuButton";
import { Tooltip } from "react-tooltip";

import { toggleExpandMenu } from "../../store/slices/appUISlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useTranslation } from "react-i18next";

import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";

import MenuButtonSkeleton from "./skeleton";
import { useAccountType } from "../../hooks/useAccountType";
import { menuItems } from "../../constants/menuItems";

export const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { expandMenu } = useAppSelector((state) => state.appUI);
  const { accountType, isLoading } = useAccountType();

  const hangleCollapseMenu = useCallback(
    () => dispatch(toggleExpandMenu()),
    [dispatch]
  );

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.menu_button}>
          {!isLoading ? (
            menuItems
              .filter((item) => item.hasAccess.includes(accountType as string))
              .map(({ titleKey, url, Icon }) => (
                <MenuButton
                  key={url}
                  title={t(titleKey)}
                  url={url}
                  Icon={Icon}
                  expandMenu={expandMenu}
                />
              ))
          ) : (
            <MenuButtonSkeleton />
          )}
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
