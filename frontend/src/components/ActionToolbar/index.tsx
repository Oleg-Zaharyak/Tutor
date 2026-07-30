import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { ButtonProps, ButtonStyles } from "../Button/types";
import Button from "../Button";
import { Icons } from "../../constants/icons";
import { useTranslation } from "react-i18next";

type ActionToolbarProps = {
  buttons?: ButtonProps[];
  title?: string;
};

const ActionToolbar = ({ buttons, title }: ActionToolbarProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  return (
    <div className={styles.header}>
      {title ? (
        <h1 className={styles.header_text}>{title}</h1>
      ) : (
        <Button
          Icon={Icons.arrowBack}
          title={t("buttons-title.back-btn")}
          onClick={() => navigate(-1)}
          buttonStyle={ButtonStyles.LINK}
          medium
        />
      )}
      {buttons && (
        <div className={styles.buttons}>
          {buttons?.map((btn, index) => (
            <Button key={index} medium {...btn} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionToolbar;
