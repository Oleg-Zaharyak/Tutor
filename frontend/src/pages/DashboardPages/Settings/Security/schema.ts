import * as Yup from "yup";

import i18next from "i18next";
import { passwordRules } from "../../../../constants/variables";

export const ChangePasswordSchema = () =>
  Yup.object().shape({
    oldPassword: Yup.string().required(
      i18next.t("security.form.old-password.error.required", {
        ns: "settings",
      })
    ),
    newPassword: Yup.string()
      .min(
        8,
        i18next.t("security.form.new-password.error.min", { ns: "settings" })
      )
      .max(
        25,
        i18next.t("security.form.new-password.error.max", { ns: "settings" })
      )
      .matches(passwordRules, {
        message: i18next.t("security.form.new-password.error.invalide", {
          ns: "settings",
        }),
      })
      .required(
        i18next.t("security.form.new-password.error.required", {
          ns: "settings",
        })
      ),
  });
