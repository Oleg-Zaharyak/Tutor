import styles from "./styles.module.scss";

import { useTranslation } from "react-i18next";

const PasswordResetSuccessModal = () => {
  const { t } = useTranslation("resetPassword");
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {t("reset-password.successful-password-reset.title")}
        </h1>
        <p className={styles.sub_title}>
          {t("reset-password.successful-password-reset.sub-title")}
        </p>
      </div>
    </div>
  );
};

export default PasswordResetSuccessModal;
