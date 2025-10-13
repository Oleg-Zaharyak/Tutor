import { useTranslation } from "react-i18next";
import Button from "../../../components/Button";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useGetConnectedAccountProfileListQuery } from "../../../store/api/connectionApi";
import AccountConnectionModal from "../../../components/AccountConnectionModal";
import LayoutToggle from "../../../components/LayoutToggle";
import { LayoutType } from "../../../components/LayoutToggle/types";
import { TeacherTable } from "./TeacherTable";
import { TeacherGrid } from "./TeacherGrid";
import clsx from "clsx";

const LAYOUT_KEY = "selected_layout";

const Teachers = () => {
  const { t } = useTranslation(["common", "teachers"]);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [layout, setLayout] = useState<LayoutType>("grid");

  const {
    data: connectedAccountListData,
    isLoading: isConnectedAccountListDataLoading,
    isFetching: isConnectedAccountListDataFetching,
  } = useGetConnectedAccountProfileListQuery();

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

  const isDataLoading =
    isConnectedAccountListDataFetching || isConnectedAccountListDataLoading;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.header_text}>{t("title", { ns: "teachers" })}</h1>
        <Button
          onClick={handleToggleModal}
          title={t("add-btn-title", { ns: "teachers" })}
          size="medium"
          styleType="outline"
        />
      </div>
      <div className={styles.filter_container}>
        <LayoutToggle value={layout} onChange={setLayout} />
      </div>

      {layout === "grid" &&
        ((connectedAccountListData && connectedAccountListData.length !== 0) ||
        isDataLoading ? (
          <div className={clsx(styles.content, styles.content_grid)}>
            <TeacherGrid
              teacherList={connectedAccountListData}
              isLoading={isDataLoading}
            />
          </div>
        ) : (
          <div className={styles.content_empty}>
            <div className={styles.content_empty_text}>
              {t("no-data", { ns: "common" })}
            </div>
          </div>
        ))}
      {layout === "table" && (
        <div className={clsx(styles.content, styles.content_table)}>
          <TeacherTable
            teacherList={connectedAccountListData}
            isLoading={isDataLoading}
          />
        </div>
      )}
      {isOpenModal && (
        <AccountConnectionModal
          accountType="STUDENT"
          onClose={handleToggleModal}
        />
      )}
    </div>
  );
};

export default Teachers;
