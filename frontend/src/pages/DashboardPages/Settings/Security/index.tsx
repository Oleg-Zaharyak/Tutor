import styles from "./styles.module.scss";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import ConfirmModal from "../../../../components/ConfirmModal";

import { useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { ChangePasswordSchema } from "./schema";

import { useAppDispatch } from "../../../../hooks/hooks";
import { setLoading } from "../../../../store/slices/appUISlice";

import { useReverification, useUser } from "@clerk/clerk-react";
import { ClerkSignInError } from "../../../../types/clerk";

const SecuritySettings = () => {
  const { t } = useTranslation("settings");
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [clerkErrors, setClerkErrors] = useState<ClerkSignInError>({});

  const { user, isLoaded } = useUser();

  const changePassword = useReverification((oldPassword, newPassword) =>
    user?.updatePassword({
      currentPassword: oldPassword,
      newPassword: newPassword,
    })
  );

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      dispatch(setLoading(true));
      let clerkErrorsInfo = {};

      try {
        await changePassword(values.oldPassword, values.newPassword);
        resetForm();
        setShowConfirmModal(true);
      } catch (err) {
        const clerkErr = err as ClerkSignInError;
        if (clerkErr.errors) {
          clerkErrorsInfo = clerkErr;

          const incorrectOldPassword = clerkErr.errors.find(
            (e) => e.meta.paramName === "current_password"
          );

          if (incorrectOldPassword) {
            setErrors({
              oldPassword: t("security.form.old-password.error.incorrect"),
            });
          } else {
            console.log("Error", clerkErr.errors);
          }
        }
      } finally {
        setClerkErrors(clerkErrorsInfo);
        dispatch(setLoading(false));
      }
    },
  });

  i18next.on("languageChanged", async () => {
    await formik.validateForm();

    if (clerkErrors.errors) {
      const incorrectOldPassword = clerkErrors.errors.find(
        (e) => e.meta.paramName === "current_password"
      );
      if (incorrectOldPassword) {
        formik.setErrors({
          oldPassword: t("security.form.old-password.error.incorrect"),
        });
      } else {
        console.log("Error", clerkErrors.errors);
      }
    }
  });

  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit} className={styles.container}>
        <h1 className={styles.header}>{t("security.form.title")}</h1>
        <Input
          name="oldPassword"
          inputType="password"
          title={t("security.form.old-password.title")}
          placeholder={t("security.form.old-password.placeholder")}
          value={formik.values.oldPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          containerClassName={styles.input}
          error={
            Boolean(formik.errors.oldPassword) &&
            Boolean(formik.touched.oldPassword)
          }
          errorText={formik.errors.oldPassword}
        />

        <Input
          name="newPassword"
          inputType="password"
          title={t("security.form.new-password.title")}
          placeholder={t("security.form.new-password.placeholder")}
          value={formik.values.newPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          containerClassName={styles.input}
          error={
            Boolean(formik.errors.newPassword) &&
            Boolean(formik.touched.newPassword)
          }
          errorText={formik.errors.newPassword}
        />
        <Button
          type="submit"
          title={t("security.form.btn-title")}
          className={styles.button}
          disabled={!isLoaded}
        />
      </form>
      {showConfirmModal && (
        <ConfirmModal
          title={t("security.confirm-modal.title")}
          onClose={() => setShowConfirmModal(false)}
          cancelText={t("security.confirm-modal.btn-title")}
          showTwoButton={false}
          className={styles.confitm_modal}
        />
      )}
    </div>
  );
};

export default SecuritySettings;
