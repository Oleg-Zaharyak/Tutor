import { skipToken } from "@reduxjs/toolkit/query";
import { useAppDispatch } from "../../hooks/hooks";
import {
  useGetCurrentUserProfileQuery,
  useUpdateProfileMutation,
} from "../../store/api/profileApi";
import styles from "./styles.module.scss";
import { FiPlus } from "react-icons/fi";
import { useUser } from "@clerk/clerk-react";
import { toCapitalCase } from "../../utils/string";
import clsx from "clsx";
import { useState } from "react";
import ConfirmModal from "../ConfirmModal";
import { setLoading } from "../../store/slices/appUISlice";
import { useCreateAccountMutation } from "../../store/api/accountApi";

const AccountList = () => {
  const dispatch = useAppDispatch();
  const { user } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [updateProfile] = useUpdateProfileMutation();
  const [createAccount] = useCreateAccountMutation();

  const { data: profileData } = useGetCurrentUserProfileQuery(
    user ? { id: user.id } : skipToken
  );

  const accounts = profileData?.accounts || [];
  const activeAccountId = profileData?.selectedAccountId;
  const accountId = profileData?.id || "";
  const addAccountType =
    profileData?.accounts[0].type === "STUDENT" ? "TEACHER" : "STUDENT";

  const handleCreateAccount = async () => {
    dispatch(setLoading(true));
    try {
      const account = await createAccount({
        profileId: accountId,
        type: addAccountType,
      }).unwrap();

      await updateProfile({
        profileId: accountId,
        data: {
          selectedAccountId: account.id,
        },
      }).unwrap();
    } catch (err) {
      console.error("Помилка оновлення:", err);
    } finally {
      setIsOpen(false);
      dispatch(setLoading(false));
    }
  };

  const handleChangeAccount = async () => {
    dispatch(setLoading(true));
    try {
      await updateProfile({
        profileId: accountId,
        data: {
          selectedAccountId: selectedId,
        },
      }).unwrap();
    } catch (err) {
      console.error("Помилка оновлення:", err);
    } finally {
      setIsOpen(false);
      dispatch(setLoading(false));
    }
  };

  const handleClick = (id: string) => {
    if (id === activeAccountId) return;
    setSelectedId(id);
    setIsOpen(true);
  };

  if (accounts.length < 2) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          styles.addAccount,
          isOpen && styles.addAccount_disabledHover
        )}
      >
        <div className={styles.addAccount_text}>
          {`Add ${toCapitalCase(addAccountType)} account`}
        </div>
        <FiPlus className={styles.addAccount_icon} />
        {isOpen ? (
          <ConfirmModal
            onClose={() => setIsOpen(false)}
            onConfirm={handleCreateAccount}
            text="Ти впевнений, що хочеш додати акаунт?"
          />
        ) : null}
      </button>
    );
  }

  return (
    <div className={styles.accounts}>
      <div className={styles.accounts_title}>Accounts</div>
      <div className={styles.account}>
        {accounts.map((item) => (
          <button
            onClick={() => handleClick(item.id)}
            key={item.id}
            className={clsx(
              styles.account_btn,
              item.id === activeAccountId && styles.account_btn_active
            )}
          >
            {toCapitalCase(item.type)}
          </button>
        ))}
        {isOpen ? (
          <ConfirmModal
            onClose={() => setIsOpen(false)}
            onConfirm={handleChangeAccount}
            text="Ти впевнений, що хочеш змінити акаунт?"
          />
        ) : null}
      </div>
    </div>
  );
};

export default AccountList;
