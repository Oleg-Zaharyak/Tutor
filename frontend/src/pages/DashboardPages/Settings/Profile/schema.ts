import * as Yup from "yup";

import i18next from "i18next";
import { telInputMask } from "../../../../constants/variables";

export const ProfileSettingsSchema = () =>
  Yup.object().shape({
    firstName: Yup.string().min(
      2,
      i18next.t("profile.first-name.error.min", {
        ns: "settings",
      })
    ),

    lastName: Yup.string().min(
      2,
      i18next.t("profile.last-name.error.min", {
        ns: "settings",
      })
    ),

    address: Yup.string(),

    phoneNumber: Yup.string().length(
      telInputMask.length,
      i18next.t("profile.phone-number.error.length", {
        ns: "settings",
      })
    ),
  });
