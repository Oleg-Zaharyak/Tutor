import styles from "./styles.module.scss";
import { FC, useState } from "react";

import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import Input from "../../../components/Input";
import Checkbox from "../../../components/CkeckBox";
import Button from "../../../components/Button";
import { SignUpSchema } from "../../../libs/schema";
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

const SignUpPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { signUp, isLoaded } = useSignUp();

  const [showPassword, setShowPassword] = useState(false);

  const formikOne = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      dispatch(setLoading(true));
      if (!isLoaded) return;

      try {
        await signUp?.create({
          emailAddress: values.email,
          password: values.password,
        });

        // Запуск верифікації email (користувачу прийде лист)
        await signUp?.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        navigate("/email-verify");
      } catch (err) {
        const clerkError = err as ClerkSignInError;

        console.error(clerkError);
        setErrors({
          email: "Не вдалося створити акаунт. Можливо, емейл вже зайнятий.",
        });
      } finally {
        setSubmitting(false);
        dispatch(setLoading(false));
      }
    },
  });

  i18next.on("languageChanged", () => {
    formikOne.validateForm();
  });

  return (
    <>
      <h1 className={styles.title}>{t("sign-up.title")}</h1>
      <p className={styles.sub_title}>{t("sign-up.sub-title")}</p>
      <form onSubmit={formikOne.handleSubmit} className={styles.form}>
        <div className={styles.inputs_container}>
          <Input
            name="email"
            inputType="text"
            style={{ width: "100%" }}
            title={t("sign-up.email.title")}
            value={formikOne.values.email}
            error={
              Boolean(formikOne.errors.email) &&
              Boolean(formikOne.touched.email)
            }
            errorText={formikOne.errors.email}
            onBlure={formikOne.handleBlur}
            onChange={formikOne.handleChange}
            placeholder={t("sign-up.email.placeholder")}
          />
          <Input
            name="password"
            inputType="password"
            title={t("sign-up.password.title")}
            style={{ width: "100%" }}
            value={formikOne.values.password}
            error={
              Boolean(formikOne.errors.password) &&
              Boolean(formikOne.touched.password)
            }
            errorText={formikOne.errors.password}
            onChange={formikOne.handleChange}
            onBlure={formikOne.handleBlur}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            placeholder={t("sign-up.password.placeholder")}
          />
          <Input
            name="confirmPassword"
            inputType="password"
            title={t("sign-up.confirm-password.title")}
            style={{ width: "100%" }}
            error={
              Boolean(formikOne.errors.confirmPassword) &&
              Boolean(formikOne.touched.confirmPassword)
            }
            errorText={formikOne.errors.confirmPassword}
            value={formikOne.values.confirmPassword}
            onChange={formikOne.handleChange}
            onBlure={formikOne.handleBlur}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            placeholder={t("sign-up.confirm-password.placeholder")}
          />
        </div>
        <div className={styles.middle_buttons}>
          <Checkbox
            title={t("sign-up.acceptTerms")}
            name="acceptTerms"
            onChange={formikOne.handleChange}
            error={
              Boolean(formikOne.errors.acceptTerms) &&
              Boolean(formikOne.touched.acceptTerms)
            }
          />
        </div>
        <Button
          title={t("sign-up.btn-title")}
          style={{ width: "80%" }}
          type="submit"
        />
        <div className={styles.bottom_container}>
          <span className={styles.bottom_container_text}>
            {t("sign-up.under-btn.text")}
          </span>
          <NavLink className={styles.bottom_container_link} to={"/sign-in"}>
            {t("sign-up.under-btn.link")}
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default SignUpPage;
