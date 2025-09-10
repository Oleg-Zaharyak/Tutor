import { Outlet } from "react-router-dom";
import MenuButton from "../../../components/MenuButton";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

const settingMenuItems = [
  {
    title: "profile.title",
    url: "/dashboard/settings/profile",
  },
  {
    title: "account.title",
    url: "/dashboard/settings/account",
  },
  {
    title: "security.title",
    url: "/dashboard/settings/security",
  },
];

const Settings = () => {
  const { t } = useTranslation("settings");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.header_text}>{t("title")}</h1>
        <div className={styles.nav}>
          {settingMenuItems.map(({ url, title }) => (
            <MenuButton
              key={url}
              title={t(title)}
              url={url}
              className={styles.nav_button}
            />
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
