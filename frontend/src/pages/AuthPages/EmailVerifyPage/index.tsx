import styles from "./styles.module.scss";
import { FC, useState } from "react";

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

const EmailVerifyPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { signUp, isLoaded, setActive } = useSignUp();
  const [clerkErrors, setClerkErrors] = useState<ClerkSignInError>({});

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
    } else {
      formik.setErrors({ code: t("email-verify.clerk-error.default") });
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
            onBlure={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder={t("email-verify.code.placeholder")}
          />
        </div>

        <Button
          title={t("email-verify.btn-title")}
          style={{ width: "80%", marginTop: "40px" }}
          type="submit"
        />
      </form>
    </>
  );
};

export default EmailVerifyPage;
