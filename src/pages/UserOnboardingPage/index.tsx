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
// import { useNavigate } from "react-router-dom";

// import { useSignIn } from "@clerk/clerk-react";

// import { useAppDispatch } from "../../../hooks/hooks";
// import { setLoading } from "../../../store/slices/appUISlice";

const UserOnboardingPage: FC = () => {
  const { t } = useTranslation();
  //   const { signIn } = useSignIn();
  // const navigate = useNavigate();
  //   const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      accountType: "one",
    },
    validationSchema: UserOnbardingSchema,
    onSubmit: (values) => {
      console.log(values);
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
            <>
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
                onBlure={formik.handleBlur}
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
                onBlure={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder={t("user-onboarding.last-name.placeholder")}
              />
              <Input
                name="dateOfBirth"
                inputType="date"
                style={{ width: "100%" }}
                title={t("user-onboarding.date-of-birth.title")}
                value={formik.values.dateOfBirth}
                error={
                  Boolean(formik.errors.dateOfBirth) &&
                  Boolean(formik.touched.dateOfBirth)
                }
                errorText={formik.errors.dateOfBirth}
                onBlure={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <Select
                name="accountType"
                title={t("user-onboarding.account-type.title")}
                style={{ width: "100%" }}
                onChange={formik.handleChange}
                options={accountTypeOptions}
              />
              <Button title="Continue" style={{ width: "80%" }} type="submit" />
            </>
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
