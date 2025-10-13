import { FC } from "react";
import styles from "./styles.module.scss";
import { HiOutlineUserCircle } from "react-icons/hi";
import { TbPhotoCog, TbPhotoPlus } from "react-icons/tb";
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
        <HiOutlineUserCircle className={styles.default_icon} />
      )}

      <div className={styles.overlay}>
        {url ? (
          <TbPhotoCog className={styles.overlay_icon} />
        ) : (
          <TbPhotoPlus className={styles.overlay_icon} />
        )}
      </div>
    </div>
  );
};
