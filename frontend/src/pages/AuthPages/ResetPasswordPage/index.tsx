import styles from "./styles.module.scss";

import { useFormik } from "formik";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";

import { useSignIn, useSignUp } from "@clerk/clerk-react";

import { useAppDispatch } from "../../../hooks/hooks";
import { setLoading } from "../../../store/slices/appUISlice";

import { ResetPasswordSchema } from "../../../libs/schema";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import PasswordResetSuccessModal from "../../../components/PasswordResetSuccessModal";
import { ClerkSignInError } from "../../../types/clerk";

const ResetPasswordPage: FC = () => {
  const { t } = useTranslation("resetPassword");
  const { signIn } = useSignIn();
  const { isLoaded, setActive } = useSignUp();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [counter, setCounter] = useState(0);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [clerkErrors, setClerkErrors] = useState<ClerkSignInError>({});

  const [showModal, setShowModal] = useState(false);

  //витягу емеїл з локал хоста
  useEffect(() => {
    const email = sessionStorage.getItem("resetPasswordEmail");
    if (email) {
      setResetPasswordEmail(email);
    }

    return () => sessionStorage.removeItem("resetPasswordEmail");
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
      let clerkErrorsInfo = {};
      if (!isLoaded) return;

      try {
        const result = await signIn?.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code: values.code,
          password: values.newPassword,
        });

        if (result?.status === "complete") {
          sessionStorage.removeItem("resetPasswordEmail");
          setShowModal(true);

          setTimeout(async () => {
            setShowModal(false);
            await setActive({ session: result.createdSessionId });
            navigate("/dashboard");
          }, 3000);
        } else {
          setErrors({
            code: " ",
            newPassword: t("reset-password.clerk-error.default"),
          });
        }
      } catch (err) {
        const clerkErr = err as ClerkSignInError;

        if (clerkErr.errors) {
          clerkErrorsInfo = clerkErr;
          const codeError = clerkErr.errors.find(
            (e) => e.meta.paramName === "code"
          );

          const expiredCode = clerkErr.errors.find(
            (e) => e.code === "verification_expired"
          );

          if (codeError) {
            setErrors({
              code: t("reset-password.clerk-error.invalide"),
            });
          } else if (expiredCode) {
            setErrors({
              code: t("reset-password.clerk-error.expired"),
            });
          } else {
            setErrors({
              code: " ",
              newPassword: t("reset-password.clerk-error.default"),
            });
          }
        } else {
          setErrors({
            code: " ",
            newPassword: t("reset-password.clerk-error.default"),
          });
        }
      } finally {
        setSubmitting(false);
        setClerkErrors(clerkErrorsInfo);
        dispatch(setLoading(false));
      }
    },
  });

  i18next.on("languageChanged", async () => {
    await formik.validateForm();
    if (clerkErrors.errors) {
      setClerkErrors(clerkErrors);

      const codeError = clerkErrors.errors.find(
        (e) => e.meta.paramName === "code"
      );

      const expiredCode = clerkErrors.errors.find(
        (e) => e.code === "verification_expired"
      );

      if (codeError) {
        formik.setErrors({
          code: t("reset-password.clerk-error.invalide"),
        });
      } else if (expiredCode) {
        formik.setErrors({
          code: t("reset-password.clerk-error.expired"),
        });
      } else {
        formik.setErrors({
          code: " ",
          newPassword: t("reset-password.clerk-error.default"),
        });
      }
    }
  });
  return (
    <>
      <h1 className={styles.title}>{t("reset-password.title")}</h1>
      <p className={styles.sub_title}>{t("reset-password.sub-title")}</p>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <Input
          name="code"
          inputType="text"
          style={{ width: "100%" }}
          title={t("reset-password.code.title")}
          value={formik.values.code}
          error={Boolean(formik.errors.code) && Boolean(formik.touched.code)}
          errorText={formik.errors.code}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder={t("reset-password.code.placeholder")}
        />
        <Input
          name="newPassword"
          inputType="password"
          style={{ width: "100%" }}
          title={t("reset-password.new-password.title")}
          value={formik.values.newPassword}
          error={
            Boolean(formik.errors.newPassword) &&
            Boolean(formik.touched.newPassword)
          }
          errorText={formik.errors.newPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          placeholder={t("reset-password.new-password.placeholder")}
        />
        <div className={styles.buttons_container}>
          <Button
            title={t("reset-password.reset-btn-title")}
            style={{ width: "80%" }}
            type="submit"
          />
          {counter ? (
            <div className={styles.counter}>
              {t("reset-password.resend-code-timer-text", { counter })}
            </div>
          ) : (
            <div className={styles.resend_button} onClick={handleResendCode}>
              {t("reset-password.resend-code-btn-title")}
            </div>
          )}
        </div>
      </form>
      {showModal && <PasswordResetSuccessModal />}
    </>
  );
};

export default ResetPasswordPage;
