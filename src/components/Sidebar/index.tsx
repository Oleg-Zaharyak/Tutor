import { FC } from "react";
import styles from "./styles.module.scss";
import MenuButton from "../MenuButton";
import { RiDashboardLine } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks/hooks";

export const Sidebar: FC = () => {
  const { t } = useTranslation();
  const { expandMenu } = useAppSelector((state) => state.appUI);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        Logo
        {/* <button onClick={onClose}>Close</button> */}
      </div>
      <div className={styles.menu}>
        <div className={styles.menu_button}>
          <MenuButton
            title={t("menu.title-main")}
            url="/dashboard"
            Icon={RiDashboardLine}
            expandMenu={expandMenu}
            active={true}
          />
          <MenuButton
            title={t("menu.title-student")}
            url="/dashboard"
            Icon={IoPeopleOutline}
            expandMenu={expandMenu}
          />
        </div>
      </div>
    </div>
  );
};
