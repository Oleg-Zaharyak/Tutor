import { FC, useState } from "react";
import styles from "./styles.module.scss";

import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineUserCircle } from "react-icons/hi";

import { useUser } from "@clerk/clerk-react";
import { TopBarProps } from "./types";
import { useAppSelector } from "../../hooks/hooks";
import { useGetCurrentUserProfileQuery } from "../../store/api/profileApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { toCapitalCase } from "../../utils/string";
import ProfileSkeleton from "./profileSkeleton";
import { useGetCurrentUserAccountQuery } from "../../store/api/accountApi";
import PortfolioModal from "../PortfolioModal";
import clsx from "clsx";

const TopBar: FC<TopBarProps> = ({ onBurgerClick, isMobileMenuOpen }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user } = useUser();

  const { token } = useAppSelector((state) => state.appUI);

  //Витягую дані про профіль користувача
  const { data: profileData, isLoading: isProfileLoading } =
    useGetCurrentUserProfileQuery(
      token && user ? { id: user.id, token } : skipToken
    );

  //Витягую дані про акаунт користувача
  const { data: accountData, isLoading: isAccountLoading } =
    useGetCurrentUserAccountQuery(
      token && profileData
        ? { id: profileData.selectedAccountId, token }
        : skipToken
    );

  // Робить щоб слово починалось з великої літери
  const selectedAccount = accountData?.type && toCapitalCase(accountData?.type);

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
        {!isProfileLoading && !isAccountLoading ? (
          <div
            onClick={handleCloseModal}
            className={clsx(styles.profile, {
              [styles.profile_active]: showProfileModal,
            })}
          >
            <HiOutlineUserCircle className={styles.profile_img} />
            <div className={styles.profile_info}>
              <p className={styles.profile_name}>{profileData?.fullName}</p>
              <p className={styles.profile_role}>{selectedAccount}</p>
            </div>
          </div>
        ) : (
          <ProfileSkeleton />
        )}
        {showProfileModal && (
          <PortfolioModal
            profileData={profileData}
            handleCloseModal={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default TopBar;
