import * as Yup from "yup";
import i18next from "i18next";

export const UserOnbardingSchema = () =>
  Yup.object().shape({
    firstName: Yup.string()
      .required(
        i18next.t("first-name.error.required", {
          ns: "userOnboarding",
        })
      )
      .min(
        2,
        i18next.t("first-name.error.min", {
          ns: "userOnboarding",
        })
      ),

    lastName: Yup.string()
      .required(
        i18next.t("last-name.error.required", {
          ns: "userOnboarding",
        })
      )
      .min(
        2,
        i18next.t("first-name.error.min", {
          ns: "userOnboarding",
        })
      ),

    accountType: Yup.string()
      .oneOf(
        ["STUDENT", "TEACHER"],
        i18next.t("account-type.error.invalide", {
          ns: "userOnboarding",
        })
      )
      .required(
        i18next.t("account-type.error.required", {
          ns: "userOnboarding",
        })
      ),
  });
