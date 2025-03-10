import * as Yup from "yup";
import { emailRules, passwordRules } from "../constants/variables";
import i18next from "i18next";

export const SignInSchema = () =>
  Yup.object().shape({
    email: Yup.string().required(i18next.t("sign-in.email.error.empty")),
    password: Yup.string().required(i18next.t("sign-in.password.error.empty")),
  });

export const SignUpSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .matches(emailRules, {
        message: i18next.t("sign-up.email.error.invalide"),
      })
      .required(i18next.t("sign-up.email.error.required")),
    password: Yup.string()
      .min(5, i18next.t("sign-up.password.error.min"))
      .max(25, i18next.t("sign-up.password.error.max"))
      .matches(passwordRules, {
        message: i18next.t("sign-up.password.error.invalide"),
      })
      .required(i18next.t("sign-up.password.error.required")),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        i18next.t("sign-up.confirm-password.error.match")
      )
      .required(i18next.t("sign-up.confirm-password.error.required")),
    acceptTerms: Yup.boolean().oneOf([true]),
  });

export const ForgotPasswordSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .matches(emailRules, {
        message: i18next.t("forgot-password.email.error.invalide"),
      })
      .required(i18next.t("forgot-password.email.error.required")),
  });
