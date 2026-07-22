import { Navigate, useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import {
  useDeleteConnectionMutation,
  useGetConnectionByIdQuery,
} from "../../../../store/api/connectionApi";
import { skipToken } from "@reduxjs/toolkit/query";

import { Icons } from "../../../../constants/icons";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import ConfirmModal from "../../../../components/ConfirmModal";
import { useAppDispatch } from "../../../../hooks/hooks";
import { setLoading } from "../../../../store/slices/appUISlice";
import { API_BASE_URL } from "../../../../constants/endpointsApi";
import { ButtonStyles } from "../../../../components/Button/types";
import ActionToolbar from "../../../../components/ActionToolbar";

const StudentDetails = () => {
  const { t } = useTranslation(["students", "common"]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { connectionId } = useParams<{ connectionId: string }>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteConnection] = useDeleteConnectionMutation();

  const { data, isError, isLoading } = useGetConnectionByIdQuery(
    connectionId ? connectionId : skipToken,
  );
  // const conectionStaus = "ACTIVE";
  const userStatus = data?.student.status;

  const userAvatarUrl = data?.student.profile.avatarUrl;

  if (!isLoading && (isError || !data))
    return <Navigate to="/dashboard/students" replace />;

  const handleDeleteConnection = async (connectionId: string | undefined) => {
    if (!connectionId) return;
    dispatch(setLoading(true));

    try {
      // Викликаємо мутацію для видалення конекшина
      await deleteConnection(connectionId).unwrap();

      navigate("/dashboard/students");
    } catch (err) {
      console.error("Помилка видалення конекшина:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const editButtons = [
    {
      title: t("common:buttons-title.save-btn"),
      buttonStyle: ButtonStyles.OUTLINE,
    },
    {
      title: t("common:buttons-title.cancel-btn"),
      buttonStyle: ButtonStyles.OUTLINE,
      onClick: () => setIsEdit(false),
    },
  ];

  const viewButtons = [
    {
      title: t("common:buttons-title.chat-btn"),
      onClick: () => navigate("/dashboard/chats"),
      buttonStyle: ButtonStyles.OUTLINE,
    },
    {
      title: t("common:buttons-title.edit-btn"),
      onClick: () => setIsEdit(true),
      buttonStyle: ButtonStyles.OUTLINE,
    },
    {
      title: t("common:buttons-title.delete-btn"),
      Icon: Icons.delete,
      onClick: () => setIsDeleteModalOpen(true),
      buttonStyle: ButtonStyles.WARNING_OUTLINE,
      collapseTextToIcon: true,
    },
  ];

  const buttons = isEdit ? editButtons : viewButtons;

  return (
    <div className={styles.container}>
      <ActionToolbar buttons={buttons} />

      <div className={styles.content}>
        <div className={styles.user_info}>
          <div className={styles.top_container}>
            {userAvatarUrl ? (
              <img
                src={`${API_BASE_URL}${userAvatarUrl}`}
                className={styles.user_avatar}
              />
            ) : (
              <Icons.defaultUserImg className={styles.user_img} />
            )}
            <div className={styles.user_field}>
              <div className={styles.user_field_name}>
                {data?.student.profile.fullName}
              </div>
              <div className={styles.user_field_email}>
                {data?.student.profile.email}
              </div>
            </div>
          </div>
          <div className={styles[`user_status_${userStatus}`]}>
            {userStatus &&
              t(`details.status.${userStatus}`, { defaultValue: userStatus })}
          </div>
        </div>
        <div className={styles.user_calendar}>Календар</div>
      </div>
      {isDeleteModalOpen && (
        <ConfirmModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => handleDeleteConnection(connectionId)}
        />
      )}
    </div>
  );
};

export default StudentDetails;
