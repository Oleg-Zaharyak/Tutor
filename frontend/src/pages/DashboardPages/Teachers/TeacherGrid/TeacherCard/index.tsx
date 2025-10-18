import { FC } from "react";
import styles from "./styles.module.scss";
import { HiOutlineUserCircle } from "react-icons/hi";
import Button from "../../../../../components/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../../../constants/endpointsApi";
import { ButtonStyles } from "../../../../../components/Button/types";

type TeacherCardProps = {
  fullName: string;
  email: string;
  url: string;
  connectionId: string;
};

const TeacherCard: FC<TeacherCardProps> = ({
  fullName,
  email,
  url,
  connectionId,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation("teachers");
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        {url ? (
          <img src={`${API_BASE_URL}${url}`} className={styles.user_avatar} />
        ) : (
          <HiOutlineUserCircle className={styles.user_img} />
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
            navigate(`/dashboard/teachers/${connectionId}`);
          }}
          buttonStyle={ButtonStyles.OUTLINE}
          medium
        />
      </div>
    </div>
  );
};

export default TeacherCard;
