import styles from "./styles.module.scss";
import clsx from "clsx";
import { FC, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import Checkbox from "../../components/CkeckBox";
import { SignUpSchema } from "../../libs/schema";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const SignUpPage: FC = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  i18next.on("languageChanged", () => {
    formik.validateForm();
  });

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.container)}>
        <h1 className={styles.title}>{t("sign-up.title")}</h1>
        <p className={styles.sub_title}>{t("sign-up.sub-title")}</p>

        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className={styles.inputs_container}>
            <Input
              name="email"
              inputType="text"
              style={{ width: "100%" }}
              title={t("sign-up.email.title")}
              value={formik.values.email}
              error={
                Boolean(formik.errors.email) && Boolean(formik.touched.email)
              }
              errorText={formik.errors.email}
              onBlure={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={t("sign-up.email.placeholder")}
            />
            <Input
              name="password"
              inputType="password"
              title={t("sign-up.password.title")}
              style={{ width: "100%" }}
              value={formik.values.password}
              error={
                Boolean(formik.errors.password) &&
                Boolean(formik.touched.password)
              }
              errorText={formik.errors.password}
              onChange={formik.handleChange}
              onBlure={formik.handleBlur}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              placeholder={t("sign-up.password.placeholder")}
            />
            <Input
              name="confirmPassword"
              inputType="password"
              title={t("sign-up.confirm-password.title")}
              style={{ width: "100%" }}
              error={
                Boolean(formik.errors.confirmPassword) &&
                Boolean(formik.touched.confirmPassword)
              }
              errorText={formik.errors.confirmPassword}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlure={formik.handleBlur}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              placeholder={t("sign-up.confirm-password.placeholder")}
            />
          </div>
          <div className={styles.middle_buttons}>
            <Checkbox
              title={t("sign-up.acceptTerms")}
              name="acceptTerms"
              onChange={formik.handleChange}
              error={
                Boolean(formik.errors.acceptTerms) &&
                Boolean(formik.touched.acceptTerms)
              }
            />
          </div>
          <Button
            title={t("sign-up.btn-title")}
            style={{ width: "80%" }}
            type="submit"
          />
          <div className={styles.bottom_container}>
            <span className={styles.bottom_container_text}>
              {t("sign-up.under-btn.text")}
            </span>
            <NavLink className={styles.bottom_container_link} to={"/sign-in"}>
              {t("sign-up.under-btn.link")}
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
