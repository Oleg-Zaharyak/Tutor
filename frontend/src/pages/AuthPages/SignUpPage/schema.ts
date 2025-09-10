import * as Yup from "yup";
import i18next from "i18next";
import { emailRules, passwordRules } from "../../../constants/variables";


export const SignUpSchema = () =>
    Yup.object().shape({
      email: Yup.string()
        .matches(emailRules, {
          message: i18next.t("email.error.invalide", { ns: "signUp" }),
        })
        .required(i18next.t("email.error.required", { ns: "signUp" })),
      password: Yup.string()
        .min(8, i18next.t("password.error.min", { ns: "signUp" }))
        .max(25, i18next.t("password.error.max", { ns: "signUp" }))
        .matches(passwordRules, {
          message: i18next.t("password.error.invalide", { ns: "signUp" }),
        })
        .required(i18next.t("password.error.required", { ns: "signUp" })),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password")],
          i18next.t("confirm-password.error.match", { ns: "signUp" })
        )
        .required(i18next.t("confirm-password.error.required", { ns: "signUp" })),
      acceptTerms: Yup.boolean().oneOf([true]),
    });