import styles from "./styles.module.scss";
import { FC, useState } from "react";

import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import Input from "../../../components/Input";
import Checkbox from "../../../components/CkeckBox";
import Button from "../../../components/Button";
import { SignUpSchema } from "./schema";
import { useSignUp } from "@clerk/clerk-react";
import { useAppDispatch } from "../../../hooks/hooks";
import { setLoading } from "../../../store/slices/appUISlice";
import { ClerkSignInError } from "../../../types/clerk";

const SignUpPage: FC = () => {
  const { t } = useTranslation("signUp");
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
              email: t("clerk-error.incorrect-value"),
            });
          } else {
            console.log("Error", clerkErr.errors);
          }
        } else {
          setErrors({
            email: "",
            password: "",
            confirmPassword: t("clerk-error.default"),
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
          email: t("clerk-error.incorrect-value"),
        });
      } else {
        console.log("Error", clerkErrors.errors);
      }
    }
  });

  const commonConfig = {
    containerClassName: styles.input,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  };

  const inputsConfig = [
    {
      name: "email",
      inputType: "text",
      placeholder: t("email.placeholder"),
      title: t("email.title"),
      value: formik.values.email,
      error: Boolean(formik.errors.email) && Boolean(formik.touched.email),
      errorText: formik.errors.email,
    },
    {
      name: "password",
      inputType: "password",
      title: t("password.title"),
      value: formik.values.password,
      error:
        Boolean(formik.errors.password) && Boolean(formik.touched.password),

      errorText: formik.errors.password,
      showPassword: showPassword,
      setShowPassword: setShowPassword,
      placeholder: t("password.placeholder"),
    },
    {
      name: "confirmPassword",
      inputType: "password",
      title: t("confirm-password.title"),
      error:
        Boolean(formik.errors.confirmPassword) &&
        Boolean(formik.touched.confirmPassword),

      errorText: formik.errors.confirmPassword,
      value: formik.values.confirmPassword,
      showPassword: showPassword,
      setShowPassword: setShowPassword,
      placeholder: t("confirm-password.placeholder"),
    },
  ];

  return (
    <>
      <h1 className={styles.title}>{t("title")}</h1>
      <p className={styles.sub_title}>{t("sub-title")}</p>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.inputs_container}>
          {inputsConfig.map((item) => (
            <Input {...commonConfig} {...item} />
          ))}
        </div>
        <div className={styles.middle_buttons}>
          <Checkbox
            title={t("acceptTerms")}
            name="acceptTerms"
            onChange={formik.handleChange}
            error={
              Boolean(formik.errors.acceptTerms) &&
              Boolean(formik.touched.acceptTerms)
            }
          />
        </div>
        <Button title={t("btn-title")} style={{ width: "80%" }} type="submit" />
        <div className={styles.bottom_container}>
          <span className={styles.bottom_container_text}>
            {t("under-btn.text")}
          </span>
          <NavLink className={styles.bottom_container_link} to={"/sign-in"}>
            {t("under-btn.link")}
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default SignUpPage;
