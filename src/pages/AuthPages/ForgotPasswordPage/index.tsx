import styles from "./styles.module.scss";
import clsx from "clsx";

import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { FC } from "react";
import i18next from "i18next";

import { ForgotPasswordSchema } from "../../../libs/schema";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const ForgotPasswordPage: FC = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
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
        <h1 className={styles.title}>{t("forgot-password.title")}</h1>
        <p className={styles.sub_title}>{t("forgot-password.sub-title")}</p>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <Input
            name="email"
            inputType="text"
            style={{ width: "100%" }}
            title={t("forgot-password.email.title")}
            value={formik.values.email}
            error={
              Boolean(formik.errors.email) && Boolean(formik.touched.email)
            }
            errorText={formik.errors.email}
            onBlure={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder={t("forgot-password.email.placeholder")}
          />
          <div className={styles.buttons_container}>
            <Button
              title={t("forgot-password.send-btn-title")}
              style={{ width: "80%" }}
              type="submit"
            />
            <NavLink className={styles.back_button} to={"/sign-in"}>
              {t("forgot-password.back-btn-title")}
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
