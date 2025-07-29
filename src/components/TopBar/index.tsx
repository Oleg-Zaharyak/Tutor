import { FC, useState } from "react";
import styles from "./styles.module.scss";

import ThemeToggle from "../ThemeToggle";
import LanguageToggle from "../LanguageToggle";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineUserCircle } from "react-icons/hi";
import Button from "../Button";

import { useClerk } from "@clerk/clerk-react";

type TopBarProps = {
  onBurgerClick: () => void;
  isMobileMenuOpen: boolean;
};

const TopBar: FC<TopBarProps> = ({ onBurgerClick, isMobileMenuOpen }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const { signOut } = useClerk();

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
        <div
          onClick={() => setShowProfileModal(true)}
          className={styles.profile}
        >
          <HiOutlineUserCircle className={styles.profile_img} />
          <div className={styles.profile_info}>
            <p className={styles.profile_name}>Oleg Zakhariak</p>
            <p className={styles.profile_role}>Admin</p>
          </div>
        </div>
        {showProfileModal && (
          <div
            onClick={() => setShowProfileModal(false)}
            className={styles.profile_wrapper}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={styles.profile_modal}
            >
              <HiOutlineUserCircle className={styles.profile_modal_img} />
              <Button
                title="Logout"
                styleType="outline"
                onClick={handleLogout}
                className={styles.profile_modal_logout}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
