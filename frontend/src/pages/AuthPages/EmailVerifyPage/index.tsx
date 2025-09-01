import styles from "./styles.module.scss";
import { FC, useEffect, useState } from "react";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { EmailVerifySchema } from "../../../libs/schema";
import { useSignUp } from "@clerk/clerk-react";
import { useAppDispatch } from "../../../hooks/hooks";
import { setLoading } from "../../../store/slices/appUISlice";
import { ClerkSignInError } from "../../../types/clerk";
import { useCreateProfileMutation } from "../../../store/api/profileApi";

const EmailVerifyPage: FC = () => {
  const { t } = useTranslation("emailVerify");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [counter, setCounter] = useState(0);
  const { signUp, isLoaded, setActive } = useSignUp();
  const [createProfile] = useCreateProfileMutation();
  const [clerkErrors, setClerkErrors] = useState<ClerkSignInError>({});

  //Каунтер
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

  // Функція повторного надсилання коду на емеїл
  const handleResendCode = async () => {
    setCounter(30);
    try {
      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: EmailVerifySchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      dispatch(setLoading(true));
      if (!isLoaded) return;
      let clerkErrorsInfo = {};
      dispatch(setLoading(true));

      try {
        const result = await signUp.attemptEmailAddressVerification({
          code: values.code,
        });

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          const { emailAddress, createdUserId } = result;

          if (emailAddress && createdUserId) {
            await createProfile({
              id: createdUserId,
              email: emailAddress,
            }).unwrap();
          }

          navigate("/user-onboarding");
        } else {
          setErrors({ code: t("email-verify.clerk-error.default") });
        }
      } catch (err) {
        const clerkErr = err as ClerkSignInError;
        if (clerkErr.errors) {
          clerkErrorsInfo = clerkErr;
          console.error(clerkErr);
          const codeError = clerkErr.errors.find(
            (e) => e.meta.paramName === "code"
          );

          const expiredCode = clerkErr.errors.find(
            (e) => e.code === "verification_expired"
          );

          if (codeError) {
            setErrors({
              code: t("email-verify.clerk-error.invalide"),
            });
          } else if (expiredCode) {
            setErrors({
              code: t("email-verify.clerk-error.expired"),
            });
          } else {
            setErrors({ code: t("email-verify.clerk-error.default") });
          }
        } else {
          setErrors({ code: t("email-verify.clerk-error.default") });
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
      const codeError = clerkErrors.errors.find(
        (e) => e.meta.paramName === "code"
      );

      const expiredCode = clerkErrors.errors.find(
        (e) => e.code === "verification_expired"
      );

      if (codeError) {
        formik.setErrors({
          code: t("email-verify.clerk-error.invalide"),
        });
      } else if (expiredCode) {
        formik.setErrors({
          code: t("email-verify.clerk-error.expired"),
        });
      } else {
        formik.setErrors({ code: t("email-verify.clerk-error.default") });
      }
    }
  });

  return (
    <>
      <h1 className={styles.title}>{t("email-verify.title")}</h1>
      <p className={styles.sub_title}>{t("email-verify.sub-title")}</p>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.inputs_container}>
          <Input
            name="code"
            inputType="text"
            style={{ width: "100%" }}
            title={t("email-verify.code.title")}
            value={formik.values.code}
            error={Boolean(formik.errors.code) && Boolean(formik.touched.code)}
            errorText={formik.errors.code}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder={t("email-verify.code.placeholder")}
          />
        </div>
        <div className={styles.buttons_container}>
          <Button
            title={t("email-verify.btn-title")}
            style={{ width: "80%", marginTop: "40px" }}
            type="submit"
          />
          {counter ? (
            <div className={styles.counter}>
              {t("email-verify.resend-code-timer-text", { counter })}
            </div>
          ) : (
            <div className={styles.resend_button} onClick={handleResendCode}>
              {t("email-verify.resend-code-btn-title")}
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default EmailVerifyPage;
