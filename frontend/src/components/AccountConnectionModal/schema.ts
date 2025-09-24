import * as Yup from "yup";
import i18next from "i18next";
import { emailRules } from "../../constants/variables";

export const AccountConnectionSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .matches(emailRules, {
        message: i18next.t("account-connection-modal.email.error.invalide"),
      })
      .required(i18next.t("account-connection-modal.email.error.required")),
  });
