import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import { FC } from "react";
import { IconType } from "react-icons";
import clsx from "clsx";

type MenuButtonProps = {
  title: string;
  url: string;
  Icon?: IconType;
  expandMenu: boolean;
  active?: boolean;
};

const MenuButton: FC<MenuButtonProps> = ({
  title,
  url,
  Icon,
  expandMenu,
  active,
}) => {
  return (
    <NavLink
      to={url}
      className={clsx(styles.button, active && styles.button_active)}
    >
      {Icon ? <Icon className={styles.icon} /> : null}
      {!expandMenu ? title : ""}
    </NavLink>
  );
};

export default MenuButton;
