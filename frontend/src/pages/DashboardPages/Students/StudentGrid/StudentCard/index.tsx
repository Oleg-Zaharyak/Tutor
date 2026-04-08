import { FC } from "react";
import styles from "./styles.module.scss";
import { Icons } from "../../../../../constants/icons";
import Button from "../../../../../components/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../../../../../constants/endpointsApi";
import { ButtonStyles } from "../../../../../components/Button/types";

type StudentCardProps = {
  fullName: string;
  email: string;
  url: string;
  connectionId: string;
};

const StudentCard: FC<StudentCardProps> = ({
  fullName,
  email,
  url,
  connectionId,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation("students");

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        {url ? (
          <img src={`${API_BASE_URL}${url}`} className={styles.user_avatar} />
        ) : (
          <Icons.defaultUserImg className={styles.user_img} />
        )}
        <div className={styles.user_fullName}>{fullName}</div>
        <div className={styles.user_email}>{email}</div>
      </div>
      <div className={styles.buttons}>
        <Button
          className={styles.button}
          title={t("grid.message-btn")}
          buttonStyle={ButtonStyles.OUTLINE}
          onClick={() => navigate("/dashboard/chats")}
          medium
        />
        <Button
          className={styles.button}
          title={t("grid.more-info-btn")}
          onClick={() => {
            navigate(`/dashboard/students/${connectionId}`);
          }}
          buttonStyle={ButtonStyles.OUTLINE}
          medium
        />
      </div>
    </div>
  );
};

export default StudentCard;
