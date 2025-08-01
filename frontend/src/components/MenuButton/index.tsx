import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import { FC } from "react";
import { IconType } from "react-icons";
import clsx from "clsx";
import { Tooltip } from "react-tooltip";

type MenuButtonProps = {
  title: string;
  url: string;
  Icon?: IconType;
  expandMenu?: boolean;
};

const MenuButton: FC<MenuButtonProps> = ({ title, url, Icon, expandMenu }) => {
  const activeButtonClassName = clsx(styles.button, styles.button_active);
  const buttonClassName = clsx(styles.button);

  return (
    <>
      <NavLink
        data-tooltip-id={title}
        data-tooltip-content={title}
        to={url}
        className={(isActive) =>
          isActive && window.location.pathname === url
            ? activeButtonClassName
            : buttonClassName
        }
      >
        {Icon ? <Icon className={styles.icon} /> : null}
        {title}
      </NavLink>
      {expandMenu && (
        <Tooltip className={styles.tooltip} id={title} place="right" />
      )}
    </>
  );
};

export default MenuButton;
