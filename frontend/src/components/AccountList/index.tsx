import { skipToken } from "@reduxjs/toolkit/query";
import { useAppSelector } from "../../hooks/hooks";
import { useGetCurrentUserProfileQuery } from "../../store/api/profileApi";
import styles from "./styles.module.scss";
import { PiUserSwitch } from "react-icons/pi";
import { useUser } from "@clerk/clerk-react";
import { useGetCurrentUserAccountQuery } from "../../store/api/accountApi";

const AccountList = () => {
  const { token } = useAppSelector((state) => state.appUI);
  const { user } = useUser();

  const { data: profileData } = useGetCurrentUserProfileQuery(
    token && user ? { id: user.id, token } : skipToken
  );

  const { data: accountData } = useGetCurrentUserAccountQuery(
    token && profileData
      ? { id: profileData.selectedAccountId, token }
      : skipToken
  );

  console.log(accountData);

  return (
    <div className={styles.account}>
      <div className={styles.account_text}>Change account</div>
      <PiUserSwitch className={styles.account_icon} />
    </div>
  );
};

export default AccountList;
