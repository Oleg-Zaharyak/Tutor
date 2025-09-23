import { useTranslation } from "react-i18next";
import Button from "../../../components/Button";
import styles from "./styles.module.scss";
import { useState } from "react";
import { setLoading } from "../../../store/slices/appUISlice";
import { useAppDispatch } from "../../../hooks/hooks";
import { useUser } from "@clerk/clerk-react";
import { useGetCurrentUserProfileQuery } from "../../../store/api/profileApi";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useCreateAccountConnectionMutation,
  useGetConnectedAccountProfileListQuery,
} from "../../../store/api/connectionApi";
import AccountConnectionModal from "../../../components/AccountConnectionModal";
import LayoutToggle from "../../../components/LayoutToggle";
import { LayoutType } from "../../../components/LayoutToggle/types";

const Teachers = () => {
  const { t } = useTranslation("teachers");
  const dispatch = useAppDispatch();

  const { user } = useUser();

  //Витягую дані про профіль користувача
  const { data: profileData } = useGetCurrentUserProfileQuery(
    user ? { id: user.id } : skipToken
  );

  const { data: connectedAccountListData } =
    useGetConnectedAccountProfileListQuery(
      profileData ? { accountId: profileData.selectedAccountId } : skipToken
    );

  const [createAccountConnection] = useCreateAccountConnectionMutation();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [layout, setLayout] = useState<LayoutType>("grid");

  const handleToggleModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  console.log(connectedAccountListData);

  const handleAddStudent = async (targetEmail: string) => {
    dispatch(setLoading(true));
    const currentAccountId = profileData?.selectedAccountId;
    if (!currentAccountId) return;

    try {
      await createAccountConnection({
        currentAccountId,
        targetEmail,
      }).unwrap();

      setIsOpenModal(false);
    } catch (error) {
      console.error("Error adding student:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.header_text}>{t("title")}</h1>
        <Button
          onClick={handleToggleModal}
          title={t("add-btn-title")}
          size="medium"
          styleType="outline"
        />
      </div>
      <div className={styles.filter_container}>
        <LayoutToggle value={layout} onChange={setLayout} />
      </div>
      <div className={styles.content}></div>
      {isOpenModal && (
        <AccountConnectionModal
          title="Add new Student"
          btnTitle="Add student"
          onClose={handleToggleModal}
          onConfirm={handleAddStudent}
        />
      )}
    </div>
  );
};

export default Teachers;
