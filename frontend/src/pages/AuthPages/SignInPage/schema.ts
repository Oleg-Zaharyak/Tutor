import * as Yup from "yup";
import i18next from "i18next";
import { emailRules } from "../../../constants/variables";

export const SignInSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .matches(emailRules, {
        message: i18next.t("email.error.invalide", { ns: "signIn" }),
      })
      .required(i18next.t("email.error.empty", { ns: "signIn" })),
    password: Yup.string().required(
      i18next.t("password.error.empty", { ns: "signIn" })
    ),
  });
