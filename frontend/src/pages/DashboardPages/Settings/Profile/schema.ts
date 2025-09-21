import * as Yup from "yup";

import i18next from "i18next";

export const ProfileSettingsSchema = () => {
  Yup.object().shape({
    firstName: Yup.string().min(
      2,
      i18next.t("profile.first-name.error.min", {
        ns: "settings",
      })
    ),

    lastName: Yup.string().min(
      2,
      i18next.t("profile.first-name.error.min", {
        ns: "settings",
      })
    ),
  });
};
