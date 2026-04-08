import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { Icons } from "../../../../../constants/icons";

import Button from "../../../../../components/Button";
import FileInput from "../../../../../components/FileInput";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../../../../../constants/endpointsApi";
import { useUploadProfileAvatarMutation } from "../../../../../store/api/profileApi";
import { ButtonStyles } from "../../../../../components/Button/types";

type UploadPhotoModalProps = {
  url: string | undefined;
  onClose: () => void;
};

const UploadPhotoModal: FC<UploadPhotoModalProps> = ({ url, onClose }) => {
  const { t } = useTranslation("settings");
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [userAvatarUrl, setUserAvatarUrl] = useState("");

  const [uploadAvatar] = useUploadProfileAvatarMutation();

  const saveUserAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUserAvatar(file);
    const url = URL.createObjectURL(file);
    setUserAvatarUrl(url);
  };

  const handleClick = async () => {
    if (!userAvatar) return;

    const formData = new FormData();
    formData.append("avatar", userAvatar);

    try {
      const res = await uploadAvatar(formData).unwrap();
      console.log("✅ Завантажено:", res.path);
    } catch (error) {
      console.error("❌ Помилка при завантаженні:", error);
    } finally {
      onClose();
    }
  };

  console.log(userAvatar, userAvatarUrl);
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <Icons.cross onClick={onClose} className={styles.modal_btns_close} />

        {url || userAvatarUrl ? (
          <img
            src={userAvatarUrl ? userAvatarUrl : `${API_BASE_URL}${url}`}
            className={styles.user_avatar}
          />
        ) : (
          <Icons.defaultUserImg className={styles.default_icon} />
        )}

        <FileInput
          onChange={(e) => saveUserAvatar(e)}
          accept="image/*"
          styleType="outline"
          className={styles.upload_img}
          ifFileSelected={!!userAvatar}
          title={t("profile.upload-avatar.file-input.title")}
          fileLoadedTitle={t(
            "profile.upload-avatar.file-input.file-loaded-title",
          )}
        />
        <Button
          title={t("profile.upload-avatar.btn-title")}
          className={styles.save_btn}
          onClick={handleClick}
          buttonStyle={ButtonStyles.OUTLINE}
          medium
        />
      </div>
    </div>
  );
};
export default UploadPhotoModal;
