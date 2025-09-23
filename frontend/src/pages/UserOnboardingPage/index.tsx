import styles from "./styles.module.scss";
import clsx from "clsx";

import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import { FC } from "react";
import i18next from "i18next";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import { UserOnbardingSchema } from "./schema";
import LanguageToggle from "../../components/LanguageToggle";
import ThemeToggle from "../../components/ThemeToggle";

import { useUpdateProfileMutation } from "../../store/api/profileApi";
import { useAppDispatch } from "../../hooks/hooks";
import { FormTypes } from "./types";
import { useUser } from "@clerk/clerk-react";
import { setLoading } from "../../store/slices/appUISlice";
import { useCreateAccountMutation } from "../../store/api/accountApi";

const UserOnboardingPage: FC = () => {
  const { t } = useTranslation("userOnboarding");
  const dispatch = useAppDispatch();

  const [updateProfile] = useUpdateProfileMutation();
  const [createAccount] = useCreateAccountMutation();

  const { user } = useUser();

  const userId = user?.id || "";

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

        await user?.reload();
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
      title: t("account-type.types.student"),
      value: "STUDENT",
    },
    {
      title: t("account-type.types.teacher"),
      value: "TEACHER",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={clsx(styles.wrapper)}>
        <div className={clsx(styles.block)}>
          <h1 className={styles.title}>{t("title")}</h1>
          <p className={styles.sub_title}>{t("sub-title")}</p>
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <Input
              name="firstName"
              inputType="text"
              containerClassName={styles.input}
              title={t("first-name.title")}
              value={formik.values.firstName}
              error={
                Boolean(formik.errors.firstName) &&
                Boolean(formik.touched.firstName)
              }
              errorText={formik.errors.firstName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={t("first-name.placeholder")}
            />
            <Input
              name="lastName"
              inputType="text"
              containerClassName={styles.input}
              title={t("last-name.title")}
              value={formik.values.lastName}
              error={
                Boolean(formik.errors.lastName) &&
                Boolean(formik.touched.lastName)
              }
              errorText={formik.errors.lastName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={t("last-name.placeholder")}
            />
            <Select
              name="accountType"
              title={t("account-type.title")}
              containerStyle={{ width: "100%" }}
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
