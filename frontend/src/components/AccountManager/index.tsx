import { useAppDispatch } from "../../hooks/hooks";

import styles from "./styles.module.scss";
import { Icons } from "../../constants/icons";

import clsx from "clsx";
import { useState } from "react";
import ConfirmModal from "../ConfirmModal";
import { setLoading } from "../../store/slices/appUISlice";
import {
  useCreateAccountMutation,
  useGetCurrentUserAccountQuery,
} from "../../store/api/accountApi";
import { useTranslation } from "react-i18next";
import {
  useGetCurrentUserProfileQuery,
  useUpdateProfileMutation,
} from "../../store/api/profileApi";
import { useGetConnectedAccountProfileListQuery } from "../../store/api/connectionApi";

const AccountManager = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [updateProfile] = useUpdateProfileMutation();
  const [createAccount] = useCreateAccountMutation();

  const { data: profileData } = useGetCurrentUserProfileQuery();
  const { refetch: refetchAccountData } = useGetCurrentUserAccountQuery();
  const { refetch: refetchConnectionData } =
    useGetConnectedAccountProfileListQuery();

  const accounts = profileData?.accounts || [];
  const activeAccountId = profileData?.selectedAccountId;
  const accountType = profileData?.accounts[0].type;
  const addAccountType = accountType === "STUDENT" ? "TEACHER" : "STUDENT";

  const handleCreateAccount = async () => {
    dispatch(setLoading(true));
    try {
      const account = await createAccount({
        type: addAccountType,
      }).unwrap();

      await updateProfile({
        data: {
          selectedAccountId: account.id,
        },
      }).unwrap();

      await refetchAccountData();
      await refetchConnectionData();
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
        data: {
          selectedAccountId: selectedId,
        },
      }).unwrap();

      await refetchAccountData();
      await refetchConnectionData();
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
          isOpen && styles.addAccount_disabledHover,
        )}
      >
        <div className={styles.addAccount_text}>
          {t(
            `profile-modal.account-section.${accountType?.toLowerCase()}.add-btn`,
          )}
        </div>
        <Icons.plus className={styles.addAccount_icon} />
        {isOpen ? (
          <ConfirmModal
            onClose={() => setIsOpen(false)}
            onConfirm={handleCreateAccount}
            title={t(
              "profile-modal.account-section.confirm-modal.title.add-account",
            )}
            cancelText={t("profile-modal.account-section.confirm-modal.no")}
            confirmText={t("profile-modal.account-section.confirm-modal.yes")}
          />
        ) : null}
      </button>
    );
  }

  return (
    <div className={styles.accounts}>
      <div className={styles.accounts_title}>
        {t("profile-modal.account-section.title")}
      </div>
      <div className={styles.account}>
        {accounts.map((item) => (
          <button
            onClick={() => handleClick(item.id)}
            key={item.id}
            className={clsx(
              styles.account_btn,
              item.id === activeAccountId && styles.account_btn_active,
            )}
          >
            {t(
              `profile-modal.account-section.${item.type.toLowerCase()}.title`,
            )}
          </button>
        ))}
        {isOpen ? (
          <ConfirmModal
            onClose={() => setIsOpen(false)}
            onConfirm={handleChangeAccount}
            title={t(
              "profile-modal.account-section.confirm-modal.title.change-account",
            )}
            cancelText={t("profile-modal.account-section.confirm-modal.no")}
            confirmText={t("profile-modal.account-section.confirm-modal.yes")}
          />
        ) : null}
      </div>
    </div>
  );
};

export default AccountManager;
