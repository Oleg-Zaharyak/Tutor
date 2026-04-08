import { FC } from "react";
import styles from "./styles.module.scss";
import { Icons } from "../../../../../constants/icons";
import { API_BASE_URL } from "../../../../../constants/endpointsApi";

type UserPhotoProps = {
  url: string | undefined;
  onEdit?: () => void;
};

export const UserPhoto: FC<UserPhotoProps> = ({ url, onEdit }) => {
  return (
    <div className={styles.container} onClick={onEdit}>
      {url ? (
        <img src={`${API_BASE_URL}${url}`} className={styles.user_avatar} />
      ) : (
        <Icons.defaultUserImg className={styles.default_icon} />
      )}

      <div className={styles.overlay}>
        {url ? (
          <Icons.editPhoto className={styles.overlay_icon} />
        ) : (
          <Icons.uploadPhoto className={styles.overlay_icon} />
        )}
      </div>
    </div>
  );
};
