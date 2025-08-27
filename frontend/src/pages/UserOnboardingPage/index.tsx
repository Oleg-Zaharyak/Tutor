import styles from "./styles.module.scss";
import clsx from "clsx";

import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import { FC } from "react";
import i18next from "i18next";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import { UserOnbardingSchema } from "../../libs/schema";
import LanguageToggle from "../../components/LanguageToggle";
import ThemeToggle from "../../components/ThemeToggle";

import { useUpdateProfileMutation } from "../../store/api/profileApi";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { FormTypes } from "./types";
import { useUser } from "@clerk/clerk-react";
import { setLoading } from "../../store/slices/appUISlice";
import { useCreateAccountMutation } from "../../store/api/accountApi";

const UserOnboardingPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [updateProfile] = useUpdateProfileMutation();
  const [createAccount] = useCreateAccountMutation();

  const { user } = useUser();
  const { userId } = useAppSelector((state) => state.appUI);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      accountType: "STUDENT",
    },
    validationSchema: UserOnbardingSchema,
    onSubmit: async (values: FormTypes) => {
      dispatch(setLoading(true));
      try {
        const account = await createAccount({
          profileId: userId,
          type: values.accountType,
        }).unwrap();

        await updateProfile({
          profileId: userId,
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            selectedAccountId: account.id,
          },
        }).unwrap();

        if (user) {
          await user.update({
            firstName: values.firstName,
            lastName: values.lastName,
          });
        }
      } catch (err) {
        console.error("Помилка оновлення:", err);
      } finally {
        dispatch(setLoading(false));
      }
    },
  });

  i18next.on("languageChanged", () => {
    formik.validateForm();
  });

  const accountTypeOptions = [
    {
      title: t("user-onboarding.account-type.types.student"),
      value: "STUDENT",
    },
    {
      title: t("user-onboarding.account-type.types.teacher"),
      value: "TEACHER",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={clsx(styles.wrapper)}>
        <div className={clsx(styles.block)}>
          <h1 className={styles.title}>{t("user-onboarding.title")}</h1>
          <p className={styles.sub_title}>{t("user-onboarding.sub-title")}</p>
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <Input
              name="firstName"
              inputType="text"
              style={{ width: "100%" }}
              title={t("user-onboarding.first-name.title")}
              value={formik.values.firstName}
              error={
                Boolean(formik.errors.firstName) &&
                Boolean(formik.touched.firstName)
              }
              errorText={formik.errors.firstName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={t("user-onboarding.first-name.placeholder")}
            />
            <Input
              name="lastName"
              inputType="text"
              style={{ width: "100%" }}
              title={t("user-onboarding.last-name.title")}
              value={formik.values.lastName}
              error={
                Boolean(formik.errors.lastName) &&
                Boolean(formik.touched.lastName)
              }
              errorText={formik.errors.lastName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={t("user-onboarding.last-name.placeholder")}
            />
            <Select
              name="accountType"
              title={t("user-onboarding.account-type.title")}
              style={{ width: "100%" }}
              onChange={formik.handleChange}
              options={accountTypeOptions}
            />
            <Button title="Continue" style={{ width: "80%" }} type="submit" />
          </form>
        </div>
      </div>
      <div className={styles.buttons}>
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default UserOnboardingPage;
