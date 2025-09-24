import { useTranslation } from "react-i18next";
import Button from "../../../components/Button";
import styles from "./styles.module.scss";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useGetCurrentUserProfileQuery } from "../../../store/api/profileApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetConnectedAccountProfileListQuery } from "../../../store/api/connectionApi";
import AccountConnectionModal from "../../../components/AccountConnectionModal";
import LayoutToggle from "../../../components/LayoutToggle";
import { LayoutType } from "../../../components/LayoutToggle/types";

const Teachers = () => {
  const { t } = useTranslation("teachers");
  const { user } = useUser();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [layout, setLayout] = useState<LayoutType>("grid");

  //Витягую дані про профіль користувача
  const { data: profileData } = useGetCurrentUserProfileQuery(
    user ? { id: user.id } : skipToken
  );

  const { data: connectedAccountListData } =
    useGetConnectedAccountProfileListQuery(
      profileData ? { accountId: profileData.selectedAccountId } : skipToken
    );

  const handleToggleModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  console.log(connectedAccountListData);

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
          accountType="STUDENT"
          onClose={handleToggleModal}
        />
      )}
    </div>
  );
};

export default Teachers;
