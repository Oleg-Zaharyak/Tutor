import styles from "./styles.module.scss";
import { FC, useState } from "react";

import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import Input from "../../../components/Input";
import Checkbox from "../../../components/CkeckBox";
import Button from "../../../components/Button";
import { SignInSchema } from "../../../libs/schema";

import { useSignIn } from "@clerk/clerk-react";
import { setLoading } from "../../../store/slices/appUISlice";
import { useAppDispatch } from "../../../hooks/hooks";

type ClerkErrorDetail = {
  message: string;
  meta: {
    paramName: string;
  };
};

interface ClerkSignInError {
  errors?: ClerkErrorDetail[];
}

const SignInPage: FC = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberPassword: false,
    },
    validationSchema: SignInSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      if (!isLoaded) return;

      dispatch(setLoading(true));

      try {
        const result = await signIn.create({
          identifier: values.email,
          password: values.password,
        });

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          navigate("/dashboard");
        } else {
          console.log("Не завершено:", result);
        }
      } catch (err) {
        const clerkError = err as ClerkSignInError;

        if (clerkError.errors) {
          const emailError = clerkError.errors.find(
            (e) => e.meta.paramName === "identifier"
          );
          const passwordError = clerkError.errors.find(
            (e) => e.meta.paramName === "password"
          );

          if (emailError || passwordError) {
            setErrors({
              email: " ",
              password: t("sign-in.incorrect-value"),
            });
          }
        } else {
          setErrors({
            email: " ",
            password: t("sign-in.login-error"),
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
    <>
      <h1 className={styles.title}>{t("sign-in.title")}</h1>
      <p className={styles.sub_title}>{t("sign-in.sub-title")}</p>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.inputs_container}>
          <Input
            name="email"
            inputType="text"
            style={{ width: "100%" }}
            title={t("sign-in.email.title")}
            error={
              Boolean(formik.errors.email) && Boolean(formik.touched.email)
            }
            errorText={formik.errors.email}
            value={formik.values.email}
            onBlure={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder={t("sign-in.email.placeholder")}
          />
          <Input
            name="password"
            inputType="password"
            title={t("sign-in.password.title")}
            style={{ width: "100%" }}
            value={formik.values.password}
            error={
              Boolean(formik.errors.password) &&
              Boolean(formik.touched.password)
            }
            errorText={formik.errors.password}
            onBlure={formik.handleBlur}
            onChange={formik.handleChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            placeholder={t("sign-in.password.placeholder")}
          />
        </div>
        <div className={styles.middle_buttons}>
          <Checkbox
            title={t("sign-in.remember-password")}
            name="rememberPassword"
            onChange={formik.handleChange}
          />
          <NavLink
            className={styles.middle_buttons_link}
            to={"/forgot-password"}
          >
            {t("sign-in.forget-password")}
          </NavLink>
        </div>
        <Button
          title={t("sign-in.btn-title")}
          style={{ width: "80%" }}
          type="submit"
        />
        <div className={styles.bottom_container}>
          <span className={styles.bottom_container_text}>
            {t("sign-in.under-btn.text")}
          </span>
          <NavLink className={styles.bottom_container_link} to={"/sign-up"}>
            {t("sign-in.under-btn.link")}
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default SignInPage;
