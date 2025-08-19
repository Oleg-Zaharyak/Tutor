import { FC, useState } from "react";
import styles from "./styles.module.scss";

import ThemeToggle from "../ThemeToggle";
import LanguageToggle from "../LanguageToggle";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineUserCircle } from "react-icons/hi";
import Button from "../Button";

import { useClerk } from "@clerk/clerk-react";
import { useAppSelector } from "../../hooks/hooks";
import { toCapitalCase } from "../../utils/string";
import { GoGear } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { TopBarProps } from "./types";



const TopBar: FC<TopBarProps> = ({ onBurgerClick, isMobileMenuOpen }) => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { userProfile } = useAppSelector((state) => state.user);

  const role = toCapitalCase(userProfile?.role);

  const handleCloseModal = () => {
    setShowProfileModal((prev) => !prev);
  };

  const handleLogout = async () => {
    await signOut();
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
        <div className={styles.logo}>Logo</div>
      </div>
      <div className={styles.right_container}>
        <div className={styles.buttons}>
          <LanguageToggle />
          <ThemeToggle />
        </div>
        <div onClick={handleCloseModal} className={styles.profile}>
          <HiOutlineUserCircle className={styles.profile_img} />
          <div className={styles.profile_info}>
            <p className={styles.profile_name}>{userProfile.fullName}</p>
            <p className={styles.profile_role}>{role}</p>
          </div>
        </div>
        {showProfileModal && (
          <div onClick={handleCloseModal} className={styles.modal_wrapper}>
            <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
              <div className={styles.modal_top_block}>
                <div className={styles.modal_btns}>
                  <GoGear
                    onClick={() => {
                      navigate("/dashboard/settings");
                      handleCloseModal();
                    }}
                    className={styles.modal_btns_setting}
                  />
                  <RxCross2
                    onClick={handleCloseModal}
                    className={styles.modal_btns_close}
                  />
                </div>
                <HiOutlineUserCircle className={styles.modal_img} />
                <p className={styles.modal_username}>{userProfile.fullName}</p>
              </div>

              <div className={styles.modal_info_block}>
                <div className={styles.modal_email}>
                  <div className={styles.modal_email_title}>Email</div>
                  <div className={styles.modal_email_text}>
                    {userProfile.email}
                  </div>
                </div>
                <div className={styles.modal_id}>
                  <div className={styles.modal_id_title}>Your id</div>
                  <div className={styles.modal_id_text}>{userProfile.id}</div>
                </div>
              </div>

              <Button
                title="Logout"
                styleType="outline"
                onClick={handleLogout}
                className={styles.modal_logout_btn}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
