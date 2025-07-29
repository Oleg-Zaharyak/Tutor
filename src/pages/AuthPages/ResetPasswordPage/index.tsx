import styles from "./styles.module.scss";
import clsx from "clsx";

import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { FC, useEffect, useState } from "react";
import i18next from "i18next";

import { ResetPasswordSchema } from "../../../libs/schema";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { useClerk, useSignIn } from "@clerk/clerk-react";

import { useAppDispatch } from "../../../hooks/hooks";
import { setLoading } from "../../../store/slices/appUISlice";

type ClerkErrorDetail = {
  message: string;
  code: string;
  longMessage: string;
  meta: {
    paramName: string;
  };
};

interface ClerkSignInError {
  errors?: ClerkErrorDetail[];
}

const ResetPasswordPage: FC = () => {
  const { t } = useTranslation();
  const { signIn } = useSignIn();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [counter, setCounter] = useState(0);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");

  //витягу емеїл з локал хоста
  useEffect(() => {
    const email = localStorage.getItem("resetPasswordEmail");
    if (email) {
      setResetPasswordEmail(email);
    }
    return () => localStorage.removeItem("resetPasswordEmail");
  }, []);

  // каунтер

  useEffect(() => {
    let interval: number;

    if (counter > 0) {
      interval = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  // повторне надсилання коду
  const handleResendCode = async () => {
    setCounter(30);
    dispatch(setLoading(true));

    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: resetPasswordEmail,
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      code: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      dispatch(setLoading(true));
      try {
        await signIn
          ?.attemptFirstFactor({
            strategy: "reset_password_email_code",
            code: values.code,
            password: values.newPassword,
          })
          .then(async () => {
            await signOut();
            localStorage.removeItem("resetPasswordEmail");
            navigate("/successful-password-reset");
          });
      } catch (err) {
        const clerkError = err as ClerkSignInError;

        if (clerkError.errors) {
          const codeError = clerkError.errors.find(
            (e) => e.meta.paramName === "code"
          );

          const expiredCode = clerkError.errors.find(
            (e) => e.code === "verification_expired"
          );

          if (codeError) {
            setErrors({
              code: t("change-password.code.error.invalide"),
            });
          }
          if (expiredCode) {
            setErrors({
              newPassword: expiredCode?.longMessage,
            });
          }
        } else {
          setErrors({
            newPassword: "Error",
          });
        }
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
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.container)}>
        <h1 className={styles.title}>{t("change-password.title")}</h1>
        <p className={styles.sub_title}>{t("change-password.sub-title")}</p>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <>
            <Input
              name="code"
              inputType="text"
              style={{ width: "100%" }}
              title={t("change-password.code.title")}
              value={formik.values.code}
              error={
                Boolean(formik.errors.code) && Boolean(formik.touched.code)
              }
              errorText={formik.errors.code}
              onBlure={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={t("change-password.code.placeholder")}
            />
            <Input
              name="newPassword"
              inputType="password"
              style={{ width: "100%" }}
              title={t("change-password.new-password.title")}
              value={formik.values.newPassword}
              error={
                Boolean(formik.errors.newPassword) &&
                Boolean(formik.touched.newPassword)
              }
              errorText={formik.errors.newPassword}
              onBlure={formik.handleBlur}
              onChange={formik.handleChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              placeholder={t("change-password.new-password.placeholder")}
            />
            <div className={styles.buttons_container}>
              <Button
                title={t("change-password.change-btn-title")}
                style={{ width: "80%" }}
                type="submit"
              />
              {counter ? (
                <div className={styles.counter}>
                  {t("change-password.resend-code-timer-text", { counter })}
                </div>
              ) : (
                <div
                  className={styles.resend_button}
                  onClick={handleResendCode}
                >
                  {t("change-password.resend-code-btn-title")}
                </div>
              )}
            </div>
          </>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
