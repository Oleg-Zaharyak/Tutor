import * as Yup from "yup";
import { emailRules, passwordRules } from "../constants/variables";
import i18next from "i18next";

export const SignInSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .matches(emailRules, {
        message: i18next.t("sign-in.email.error.invalide", { ns: "signIn" }),
      })
      .required(i18next.t("sign-in.email.error.empty", { ns: "signIn" })),
    password: Yup.string().required(
      i18next.t("sign-in.password.error.empty", { ns: "signIn" })
    ),
  });

export const SignUpSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .matches(emailRules, {
        message: i18next.t("sign-up.email.error.invalide", { ns: "signUp" }),
      })
      .required(i18next.t("sign-up.email.error.required", { ns: "signUp" })),
    password: Yup.string()
      .min(8, i18next.t("sign-up.password.error.min", { ns: "signUp" }))
      .max(25, i18next.t("sign-up.password.error.max", { ns: "signUp" }))
      .matches(passwordRules, {
        message: i18next.t("sign-up.password.error.invalide", { ns: "signUp" }),
      })
      .required(i18next.t("sign-up.password.error.required", { ns: "signUp" })),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        i18next.t("sign-up.confirm-password.error.match", { ns: "signUp" })
      )
      .required(
        i18next.t("sign-up.confirm-password.error.required", { ns: "signUp" })
      ),
    acceptTerms: Yup.boolean().oneOf([true]),
  });

export const ForgotPasswordSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .matches(emailRules, {
        message: i18next.t("forgot-password.email.error.invalide", {
          ns: "forgotPassword",
        }),
      })
      .required(
        i18next.t("forgot-password.email.error.required", {
          ns: "forgotPassword",
        })
      ),
  });

export const ResetPasswordSchema = () =>
  Yup.object().shape({
    newPassword: Yup.string()
      .min(
        8,
        i18next.t("reset-password.new-password.error.min", {
          ns: "resetPassword",
        })
      )
      .max(
        25,
        i18next.t("reset-password.new-password.error.max", {
          ns: "resetPassword",
        })
      )
      .matches(passwordRules, {
        message: i18next.t("reset-password.new-password.error.invalide", {
          ns: "resetPassword",
        }),
      })
      .required(
        i18next.t("reset-password.new-password.error.required", {
          ns: "resetPassword",
        })
      ),
    code: Yup.string()
      .required(
        i18next.t("reset-password.code.error.required", {
          ns: "resetPassword",
        })
      )
      .length(
        6,
        i18next.t("reset-password.code.error.invalide", {
          ns: "resetPassword",
        })
      ),
  });

export const UserOnbardingSchema = () =>
  Yup.object().shape({
    firstName: Yup.string()
      .required(
        i18next.t("user-onboarding.first-name.error.required", {
          ns: "userOnboarding",
        })
      )
      .min(
        2,
        i18next.t("user-onboarding.first-name.error.min", {
          ns: "userOnboarding",
        })
      ),

    lastName: Yup.string()
      .required(
        i18next.t("user-onboarding.last-name.error.required", {
          ns: "userOnboarding",
        })
      )
      .min(
        2,
        i18next.t("user-onboarding.first-name.error.min", {
          ns: "userOnboarding",
        })
      ),

    accountType: Yup.string()
      .oneOf(
        ["STUDENT", "TEACHER"],
        i18next.t("user-onboarding.account-type.error.invalide", {
          ns: "userOnboarding",
        })
      )
      .required(
        i18next.t("user-onboarding.account-type.error.required", {
          ns: "userOnboarding",
        })
      ),
  });

export const EmailVerifySchema = () =>
  Yup.object({
    code: Yup.string()
      .required(
        i18next.t("email-verify.code.error.required", { ns: "emailVerify" })
      )
      .length(
        6,
        i18next.t("email-verify.code.error.invalide", { ns: "emailVerify" })
      ),
  });
