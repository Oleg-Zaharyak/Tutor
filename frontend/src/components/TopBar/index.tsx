import { FC, useState } from "react";
import styles from "./styles.module.scss";

import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineUserCircle } from "react-icons/hi";

import { TopBarProps } from "./types";
import { useGetCurrentUserAccountQuery } from "../../store/api/accountApi";
import { ProfileSkeleton } from "./skeleton";
import ProfileModal from "../ProfileModal";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../../constants/endpointsApi";
import { useGetCurrentUserProfileQuery } from "../../store/api/profileApi";

const TopBar: FC<TopBarProps> = ({ onBurgerClick, isMobileMenuOpen }) => {
  const { t } = useTranslation();

  const [showProfileModal, setShowProfileModal] = useState(false);

  //Витягую дані про профіль користувача
  const { data: profileData, isLoading: isProfileDataLoading } =
    useGetCurrentUserProfileQuery();

  //Витягую дані про акаунт користувача
  const { data: accountData, isLoading: isAccountLoading } =
    useGetCurrentUserAccountQuery();

  // Робить щоб слово починалось з великої літери
  const selectedAccount = accountData?.type && accountData?.type;

  // Закривання модалки профілю
  const handleCloseModal = () => {
    setShowProfileModal((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left_container}>
        <button onClick={onBurgerClick} className={styles.menu_button}>
          {isMobileMenuOpen ? (
            <RxCross2 className={styles.menu_button_icon} />
          ) : (
            <IoMenu className={styles.menu_button_icon} />
          )}
        </button>
        Logo
      </div>
      <div className={styles.right_container}>
        {!isProfileDataLoading && !isAccountLoading ? (
          <div
            onClick={handleCloseModal}
            className={clsx(styles.profile, {
              [styles.profile_active]: showProfileModal,
            })}
          >
            {profileData?.avatarUrl ? (
              <img
                src={`${API_BASE_URL}${profileData?.avatarUrl}`}
                className={styles.profile_img}
              />
            ) : (
              <HiOutlineUserCircle className={styles.profile_img} />
            )}
            <div className={styles.profile_info}>
              <p className={styles.profile_name}>{profileData?.fullName}</p>
              <p className={styles.profile_role}>
                {t(`top-bar.profile.${selectedAccount?.toLowerCase()}`)}
              </p>
            </div>
          </div>
        ) : (
          <ProfileSkeleton />
        )}
        {showProfileModal && (
          <ProfileModal
            profileData={profileData}
            handleCloseModal={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default TopBar;
