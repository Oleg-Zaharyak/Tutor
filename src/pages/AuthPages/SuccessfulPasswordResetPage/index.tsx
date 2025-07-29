import styles from "./styles.module.scss";
import clsx from "clsx";
import { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SuccessfulPasswordResetPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/sign-in");
    }, 4000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.container)}>
        <h1 className={styles.title}>
          {t("change-password.successful-password-reset.title")}
        </h1>
        <p className={styles.sub_title}>
          {t("change-password.successful-password-reset.sub-title")}
        </p>
      </div>
    </div>
  );
};

export default SuccessfulPasswordResetPage;
