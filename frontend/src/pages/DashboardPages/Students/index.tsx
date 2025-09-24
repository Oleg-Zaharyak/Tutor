import { useTranslation } from "react-i18next";
import Button from "../../../components/Button";
import styles from "./styles.module.scss";
import { useState } from "react";
import { LayoutType } from "../../../components/LayoutToggle/types";
import LayoutToggle from "../../../components/LayoutToggle";
import AccountConnectionModal from "../../../components/AccountConnectionModal";
import { useUser } from "@clerk/clerk-react";
import { useGetCurrentUserProfileQuery } from "../../../store/api/profileApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetConnectedAccountProfileListQuery } from "../../../store/api/connectionApi";

const Students = () => {
  const { t } = useTranslation("students");
  const { user } = useUser();

  //Витягую дані про профіль користувача
  const { data: profileData } = useGetCurrentUserProfileQuery(
    user ? { id: user.id } : skipToken
  );

  const { data: connectedAccountListData } =
    useGetConnectedAccountProfileListQuery(
      profileData ? { accountId: profileData.selectedAccountId } : skipToken
    );

  console.log(connectedAccountListData);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [layout, setLayout] = useState<LayoutType>("grid");

  const handleToggleModal = () => {
    setIsOpenModal((prev) => !prev);
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
      {isOpenModal && profileData?.selectedAccountId && (
        <AccountConnectionModal
          accountId={profileData?.selectedAccountId}
          accountType="TEACHER"
          onClose={handleToggleModal}
        />
      )}
    </div>
  );
};

export default Students;
