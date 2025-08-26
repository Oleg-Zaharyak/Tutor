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
import { ClerkSignInError } from "../../../types/clerk";

const SignUpPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { signUp, isLoaded } = useSignUp();

  const [showPassword, setShowPassword] = useState(false);
  const [clerkErrors, setClerkErrors] = useState<ClerkSignInError>({});

  const formik = useFormik({
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
      let clerkErrorsInfo = {};

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
        const clerkErr = err as ClerkSignInError;
        if (clerkErr.errors) {
          clerkErrorsInfo = clerkErr;

          const emailError = clerkErr.errors.find(
            (e) => e.meta.paramName === "email_address"
          );
          if (emailError) {
            setErrors({
              email: t("sign-up.clerk-error.incorrect-value"),
            });
          } else {
            console.log("Error", clerkErr.errors);
          }
        } else {
          setErrors({
            email: "",
            password: "",
            confirmPassword: t("sign-up.clerk-error.default"),
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
        (e) => e.meta.paramName === "email_address"
      );
      if (emailError) {
        formik.setErrors({
          email: t("sign-up.clerk-error.incorrect-value"),
        });
      } else {
        console.log("Error", clerkErrors.errors);
      }
    }
  });

  return (
    <>
      <h1 className={styles.title}>{t("sign-up.title")}</h1>
      <p className={styles.sub_title}>{t("sign-up.sub-title")}</p>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.inputs_container}>
          <Input
            name="email"
            inputType="text"
            style={{ width: "100%" }}
            title={t("sign-up.email.title")}
            value={formik.values.email}
            error={
              Boolean(formik.errors.email) && Boolean(formik.touched.email)
            }
            errorText={formik.errors.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder={t("sign-up.email.placeholder")}
          />
          <Input
            name="password"
            inputType="password"
            title={t("sign-up.password.title")}
            style={{ width: "100%" }}
            value={formik.values.password}
            error={
              Boolean(formik.errors.password) &&
              Boolean(formik.touched.password)
            }
            errorText={formik.errors.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
              Boolean(formik.errors.confirmPassword) &&
              Boolean(formik.touched.confirmPassword)
            }
            errorText={formik.errors.confirmPassword}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            placeholder={t("sign-up.confirm-password.placeholder")}
          />
        </div>
        <div className={styles.middle_buttons}>
          <Checkbox
            title={t("sign-up.acceptTerms")}
            name="acceptTerms"
            onChange={formik.handleChange}
            error={
              Boolean(formik.errors.acceptTerms) &&
              Boolean(formik.touched.acceptTerms)
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
