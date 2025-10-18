import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import { FC } from "react";
import clsx from "clsx";
import { Tooltip } from "react-tooltip";
import { MenuButtonProps } from "./types";

const MenuButton: FC<MenuButtonProps> = ({
  title,
  type = "nav",
  showTooltip = false,
  url,
  Icon,
  className,
}) => {
  const activeButtonClassName = clsx(
    styles.button,
    styles.button_active,
    className
  );
  const buttonClassName = clsx(styles.button, className);

  return (
    <>
      <NavLink
        data-tooltip-id={title}
        data-tooltip-content={title}
        to={url}
        className={(isActive) =>
          type === "nav"
            ? isActive && window.location.pathname.includes(url)
              ? activeButtonClassName
              : buttonClassName
            : buttonClassName
        }
      >
        {Icon ? <Icon className={styles.icon} /> : null}
        {title}
      </NavLink>
      {showTooltip && (
        <Tooltip className={styles.tooltip} id={title} place="right" />
      )}
    </>
  );
};

export default MenuButton;
