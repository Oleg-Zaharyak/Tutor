import styles from "./styles.module.scss";
import Button from "../Button";
import { useClerk } from "@clerk/clerk-react";

import { GoGear } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineUserCircle } from "react-icons/hi";
import { UserProfile } from "../../store/api/profileApi/types";
import { FC } from "react";
import LanguageToggle from "../LanguageToggle";
import ThemeToggle from "../ThemeToggle";
import AccountList from "../AccountList";

type PortfolioModalProps = {
  profileData: UserProfile | undefined;
  handleCloseModal: () => void;
};

const PortfolioModal: FC<PortfolioModalProps> = ({
  profileData,
  handleCloseModal,
}) => {
  const navigate = useNavigate();
  const { signOut } = useClerk();

  // Вихід з профіля
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <div onClick={handleCloseModal} className={styles.modal_wrapper}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <div className={styles.modal_btns}>
          <Button
            title="Logout"
            styleType="outline"
            onClick={handleLogout}
            className={styles.modal_logout_btn}
          />
          <div>
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
        </div>

        <div className={styles.line}></div>

        <div className={styles.modal_user}>
          <HiOutlineUserCircle className={styles.modal_user_img} />
          <div className={styles.modal_user_info}>
            <p className={styles.modal_user_name}>{profileData?.fullName}</p>
            <p className={styles.modal_user_email}>{profileData?.email}</p>
          </div>
        </div>

        <div className={styles.line}></div>

        <AccountList />

        

        <div className={styles.line}></div>

        <ThemeToggle bigBtn />

        <LanguageToggle bigBtn />
      </div>
    </div>
  );
};

export default PortfolioModal;
