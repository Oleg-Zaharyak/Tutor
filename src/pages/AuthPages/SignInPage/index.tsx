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
import { ClerkSignInError } from "../../../types/clerk";

const SignInPage: FC = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [clerkErrors, setClerkErrors] = useState<ClerkSignInError>({});

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberPassword: false,
    },
    validationSchema: SignInSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      if (!isLoaded) return;
      let clerkErrorsInfo = {};
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
          setErrors({
            email: " ",
            password: t("sign-in.clerk-error.default"),
          });
          console.log("Не завершено:", result);
        }
      } catch (err) {
        const clerkErr = err as ClerkSignInError;

        if (clerkErr.errors) {
          clerkErrorsInfo = clerkErr;
          const emailError = clerkErr.errors.find(
            (e) => e.meta.paramName === "identifier"
          );
          const passwordError = clerkErr.errors.find(
            (e) => e.meta.paramName === "password"
          );

          if (emailError || passwordError) {
            setErrors({
              email: " ",
              password: t("sign-in.clerk-error.incorrect-value"),
            });
          }
        } else {
          setErrors({
            email: " ",
            password: t("sign-in.clerk-error.default"),
          });
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
      const emailError = clerkErrors.errors.find(
        (e) => e.meta.paramName === "identifier"
      );
      const passwordError = clerkErrors.errors.find(
        (e) => e.meta.paramName === "password"
      );

      if (emailError || passwordError) {
        formik.setErrors({
          email: " ",
          password: t("sign-in.clerk-error.incorrect-value"),
        });
      }
    }
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
