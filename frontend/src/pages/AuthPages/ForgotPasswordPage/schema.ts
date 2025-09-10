import * as Yup from "yup";
import i18next from "i18next";
import { emailRules } from "../../../constants/variables";

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
