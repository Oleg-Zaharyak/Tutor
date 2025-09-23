import styles from "./styles.module.scss";
import clsx from "clsx";
import { FC } from "react";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TbFaceIdError } from "react-icons/tb";

const NotFoundPage: FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.container)}>
        <TbFaceIdError className={styles.icon} />
        <h1 className={styles.title}>{t("not-found.title")}</h1>
        <p className={styles.sub_title}>{t("not-found.sub-title")}</p>

        <Button
          title={t("not-found.btn-title")}
          style={{ width: "80%" }}
          type="button"
          onClick={() => navigation("/dashboard/home")}
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
