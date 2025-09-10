import * as Yup from "yup";
import i18next from "i18next";
import { passwordRules } from "../../../constants/variables";

export const ResetPasswordSchema = () =>
  Yup.object().shape({
    newPassword: Yup.string()
      .min(
        8,
        i18next.t("new-password.error.min", {
          ns: "resetPassword",
        })
      )
      .max(
        25,
        i18next.t("new-password.error.max", {
          ns: "resetPassword",
        })
      )
      .matches(passwordRules, {
        message: i18next.t("new-password.error.invalide", {
          ns: "resetPassword",
        }),
      })
      .required(
        i18next.t("new-password.error.required", {
          ns: "resetPassword",
        })
      ),
    code: Yup.string()
      .required(
        i18next.t("code.error.required", {
          ns: "resetPassword",
        })
      )
      .length(
        6,
        i18next.t("code.error.invalide", {
          ns: "resetPassword",
        })
      ),
  });
