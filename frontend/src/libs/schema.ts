import * as Yup from "yup";
import { emailRules, passwordRules } from "../constants/variables";
import i18next from "i18next";

export const SignInSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .matches(emailRules, {
        message: i18next.t("sign-up.email.error.invalide"),
      })
      .required(i18next.t("sign-in.email.error.empty")),
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
      .min(8, i18next.t("sign-up.password.error.min"))
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

export const ResetPasswordSchema = () =>
  Yup.object().shape({
    newPassword: Yup.string()
      .min(8, i18next.t("reset-password.new-password.error.min"))
      .max(25, i18next.t("reset-password.new-password.error.max"))
      .matches(passwordRules, {
        message: i18next.t("reset-password.new-password.error.invalide"),
      })
      .required(i18next.t("reset-password.new-password.error.required")),
    code: Yup.string()
      .required(i18next.t("reset-password.code.error.required"))
      .length(6, i18next.t("reset-password.code.error.invalide")),
  });

export const UserOnbardingSchema = () =>
  Yup.object().shape({
    firstName: Yup.string()
      .required(i18next.t("user-onboarding.first-name.error.required"))
      .min(2, i18next.t("user-onboarding.first-name.error.min")),

    lastName: Yup.string()
      .required(i18next.t("user-onboarding.last-name.error.required"))
      .min(2, i18next.t("user-onboarding.first-name.error.min")),

    accountType: Yup.string()
      .oneOf(
        ["STUDENT", "TEACHER"],
        i18next.t("user-onboarding.account-type.error.invalide")
      )
      .required(i18next.t("user-onboarding.account-type.error.required")),
  });

export const EmailVerifySchema = () =>
  Yup.object({
    code: Yup.string()
      .required(i18next.t("email-verify.code.error.required"))
      .length(6, i18next.t("email-verify.code.error.invalide")),
  });
