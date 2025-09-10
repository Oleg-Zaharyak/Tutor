import * as Yup from "yup";
import i18next from "i18next";

export const EmailVerifySchema = () =>
    Yup.object({
      code: Yup.string()
        .required(i18next.t("code.error.required", { ns: "emailVerify" }))
        .length(6, i18next.t("code.error.invalide", { ns: "emailVerify" })),
    });
  