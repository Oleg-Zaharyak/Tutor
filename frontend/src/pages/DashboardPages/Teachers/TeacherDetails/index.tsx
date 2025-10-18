import { Navigate, useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import {
  useDeleteConnectionMutation,
  useGetConnectionByIdQuery,
} from "../../../../store/api/connectionApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { IoArrowBackOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import Button from "../../../../components/Button";
import { useState } from "react";
import ConfirmModal from "../../../../components/ConfirmModal";
import { useAppDispatch } from "../../../../hooks/hooks";
import { setLoading } from "../../../../store/slices/appUISlice";
import { API_BASE_URL } from "../../../../constants/endpointsApi";
import { HiOutlineTrash, HiOutlineUserCircle } from "react-icons/hi";
import { ButtonStyles } from "../../../../components/Button/types";

const TeacherDetails = () => {
  const { t } = useTranslation("students");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { connectionId } = useParams<{ connectionId: string }>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConnection] = useDeleteConnectionMutation();

  const { data, isError, isLoading } = useGetConnectionByIdQuery(
    connectionId ? connectionId : skipToken
  );

  const userAvatarUrl = data?.teacher.profile.avatarUrl;

  if (!isLoading && (isError || !data))
    return <Navigate to="/dashboard/teachers" replace />;

  const handleDeleteConnection = async (connectionId: string | undefined) => {
    if (!connectionId) return;
    dispatch(setLoading(true));

    try {
      // Викликаємо мутацію для видалення конекшина
      await deleteConnection(connectionId).unwrap();

      navigate("/dashboard/teachers");
    } catch (err) {
      console.error("Помилка видалення конекшина:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          Icon={IoArrowBackOutline}
          title={t("details.back-btn")}
          onClick={() => navigate(-1)}
          buttonStyle={ButtonStyles.LINK}
          medium
        />
        <div className={styles.buttons}>
          <Button
            title="Message"
            onClick={() => navigate("/dashboard/chats")}
            buttonStyle={ButtonStyles.OUTLINE}
            medium
          />
          <Button title="Edit" buttonStyle={ButtonStyles.OUTLINE} medium />
          <Button
            title="Delete"
            Icon={HiOutlineTrash}
            onClick={() => setIsDeleteModalOpen(true)}
            buttonStyle={ButtonStyles.WARNING_OUTLINE}
            medium
            collapseTextToIcon
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.user_content}>
          <div className={styles.top_container}>
            {userAvatarUrl ? (
              <img
                src={`${API_BASE_URL}${userAvatarUrl}`}
                className={styles.user_avatar}
              />
            ) : (
              <HiOutlineUserCircle className={styles.user_img} />
            )}
            <div className={styles.user_field}>
              <div className={styles.user_field_name}>
                {data?.teacher.profile.fullName}
              </div>
              <div className={styles.user_field_email}>
                {data?.teacher.profile.email}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDeleteModalOpen ? (
        <ConfirmModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => handleDeleteConnection(connectionId)}
          title="Are you shure?"
          cancelText="No"
          confirmText="Yes"
        />
      ) : null}
    </div>
  );
};

export default TeacherDetails;
