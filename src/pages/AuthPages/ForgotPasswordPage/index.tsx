import styles from "./styles.module.scss";

import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";

import { FC } from "react";
import i18next from "i18next";

import { ForgotPasswordSchema } from "../../../libs/schema";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { useSignIn } from "@clerk/clerk-react";

import { useAppDispatch } from "../../../hooks/hooks";
import { setLoading } from "../../../store/slices/appUISlice";

const ForgotPasswordPage: FC = () => {
  const { t } = useTranslation();
  const { signIn } = useSignIn();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(setLoading(true));

      try {
        await signIn
          ?.create({
            strategy: "reset_password_email_code",
            identifier: values.email,
          })
          .then(() => {
            localStorage.setItem("resetPasswordEmail", values.email);
            navigate("/reset-password");
          });
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
        dispatch(setLoading(false));
      }
    },
  });

  i18next.on("languageChanged", () => {
    formik.validateForm();
  });

  return (
    <>
      <h1 className={styles.title}>{t("forgot-password.title")}</h1>
      <p className={styles.sub_title}>{t("forgot-password.sub-title")}</p>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <Input
          name="email"
          inputType="text"
          style={{ width: "100%" }}
          title={t("forgot-password.email.title")}
          value={formik.values.email}
          error={Boolean(formik.errors.email) && Boolean(formik.touched.email)}
          errorText={formik.errors.email}
          onBlure={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder={t("forgot-password.email.placeholder")}
        />
        <div className={styles.buttons_container}>
          <Button
            title={t("forgot-password.send-btn-title")}
            style={{ width: "80%" }}
            type="submit"
          />
          <NavLink className={styles.back_button} to={"/sign-in"}>
            {t("forgot-password.back-btn-title")}
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default ForgotPasswordPage;
