import { useTranslation } from "react-i18next";
import Button from "../../../components/Button";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { LayoutType } from "../../../components/LayoutToggle/types";
import LayoutToggle from "../../../components/LayoutToggle";
import AccountConnectionModal from "../../../components/AccountConnectionModal";
import { useUser } from "@clerk/clerk-react";
import { useGetCurrentUserProfileQuery } from "../../../store/api/profileApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetConnectedAccountProfileListQuery } from "../../../store/api/connectionApi";
import { StudentGrid } from "./StudentGrid";
import { StudentTable } from "./StudentTable";

const LAYOUT_KEY = "students_layout";

const Students = () => {
  const { t } = useTranslation("students");
  const { user, isLoaded } = useUser();

  //Витягую дані про профіль користувача
  const { data: profileData, isLoading: isProfileLoading } =
    useGetCurrentUserProfileQuery(user ? { id: user.id } : skipToken);

  const {
    data: connectedAccountListData,
    isLoading: isConnectedAccountListDataLoading,
  } = useGetConnectedAccountProfileListQuery(
    profileData ? { accountId: profileData.selectedAccountId } : skipToken
  );

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [layout, setLayout] = useState<LayoutType>("grid");

  useEffect(() => {
    const savedLayout = localStorage.getItem(LAYOUT_KEY) as LayoutType | null;
    if (savedLayout) {
      setLayout(savedLayout);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LAYOUT_KEY, layout);
  }, [layout]);

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
      <div className={styles.content}>
        {/* {connectedAccountListData && connectedAccountListData.length !== 0 ? ( */}
        <>
          {layout === "grid" && <StudentGrid />}
          {layout === "table" && (
            <StudentTable
              studentList={connectedAccountListData}
              isLoading={
                isConnectedAccountListDataLoading ||
                isProfileLoading ||
                !isLoaded
              }
            />
          )}
        </>
        {/* ) : (
          <div className={styles.content_empty}>
            <div className={styles.content_empty_text}>No data.</div>
          </div>
        )} */}
      </div>
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
