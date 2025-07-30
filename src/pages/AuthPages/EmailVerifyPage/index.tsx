import styles from "./styles.module.scss";
import { FC } from "react";

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

type ClerkErrorDetail = {
  message: string;
  meta: {
    paramName: string;
  };
};

interface ClerkSignInError {
  errors?: ClerkErrorDetail[];
}

const EmailVerifyPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { signUp, isLoaded, setActive } = useSignUp();

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: EmailVerifySchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      dispatch(setLoading(true));
      if (!isLoaded) return;

      try {
        const result = await signUp.attemptEmailAddressVerification({
          code: values.code,
        });

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          navigate("/user-onboarding");
        } else {
          setErrors({ code: "Невірний код або термін дії закінчився." });
        }
      } catch (err) {
        const clerkError = err as ClerkSignInError;
        console.error(clerkError);
        setErrors({ code: "Помилка під час верифікації коду." });
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
