import styles from "./styles.module.scss";
import i18next from "i18next";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type LanguageToggleProps = {
  bigBtn?: boolean;
};

const LanguageToggle: FC<LanguageToggleProps> = ({ bigBtn = false }) => {
  const { t } = useTranslation();

  const hangleChangeLanguage = () => {
    i18next.changeLanguage(i18next.language === "en" ? "uk" : "en");
  };

  return (
    <button
      className={bigBtn ? styles.language_bigBtn : styles.language_btn}
      onClick={hangleChangeLanguage}
    >
      {bigBtn && (
        <div className={styles.language_bigBtn_text}>Change language</div>
      )}
      {t("language-name")}
    </button>
  );
};

export default LanguageToggle;
