import styles from "./styles.module.scss";

import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";

import { FC, useState } from "react";
import i18next from "i18next";

import { ForgotPasswordSchema } from "../../../libs/schema";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { useSignIn } from "@clerk/clerk-react";

import { useAppDispatch } from "../../../hooks/hooks";
import { setLoading } from "../../../store/slices/appUISlice";
import { ClerkSignInError } from "../../../types/clerk";

const ForgotPasswordPage: FC = () => {
  const { t } = useTranslation();
  const { signIn, isLoaded } = useSignIn();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [clerkErrors, setClerkErrors] = useState<ClerkSignInError>({});

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      if (!isLoaded) return;
      dispatch(setLoading(true));
      let clerkErrorsInfo = {};

      try {
        await signIn?.create({
          strategy: "reset_password_email_code",
          identifier: values.email,
        });

        sessionStorage.setItem("resetPasswordEmail", values.email);
        navigate("/reset-password");
      } catch (err) {
        const clerkErr = err as ClerkSignInError;

        if (clerkErr.errors) {
          clerkErrorsInfo = clerkErr;

          setErrors({
            email: t("forgot-password.clerk-error.default"),
          });
          console.log("Error", clerkErr.errors);
        }
      } finally {
        setClerkErrors(clerkErrorsInfo);
        setSubmitting(false);
        dispatch(setLoading(false));
      }
    },
  });

  i18next.on("languageChanged", async () => {
    await formik.validateForm();

    if (clerkErrors.errors) {
      setClerkErrors(clerkErrors);

      formik.setErrors({
        email: t("forgot-password.clerk-error.default"),
      });
      console.log("Error", clerkErrors.errors);
    }
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
