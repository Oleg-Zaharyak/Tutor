import styles from "./styles.module.scss";
import clsx from "clsx";
import { FC, useState } from "react";

import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import Input from "../../../components/Input";
import Checkbox from "../../../components/CkeckBox";
import Button from "../../../components/Button";
import { SignInSchema } from "../../../libs/schema";


const SignInPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberPassword: false,
    },
    validationSchema: SignInSchema,
    onSubmit: () => {
      navigate("/dashboard");
    },
  });

  i18next.on("languageChanged", () => {
    formik.validateForm();
  });

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.container)}>
        <h1 className={styles.title}>{t("sign-in.title")}</h1>
        <p className={styles.sub_title}>{t("sign-in.sub-title")}</p>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className={styles.inputs_container}>
            <Input
              name="email"
              inputType="text"
              style={{ width: "100%" }}
              title={t("sign-in.email.title")}
              error={
                Boolean(formik.errors.email) && Boolean(formik.touched.email)
              }
              errorText={formik.errors.email}
              value={formik.values.email}
              onBlure={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={t("sign-in.email.placeholder")}
            />
            <Input
              name="password"
              inputType="password"
              title={t("sign-in.password.title")}
              style={{ width: "100%" }}
              value={formik.values.password}
              error={
                Boolean(formik.errors.password) &&
                Boolean(formik.touched.password)
              }
              errorText={formik.errors.password}
              onBlure={formik.handleBlur}
              onChange={formik.handleChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              placeholder={t("sign-in.password.placeholder")}
            />
          </div>
          <div className={styles.middle_buttons}>
            <Checkbox
              title={t("sign-in.remember-password")}
              name="rememberPassword"
              onChange={formik.handleChange}
            />
            <NavLink
              className={styles.middle_buttons_link}
              to={"/forgot-password"}
            >
              {t("sign-in.forget-password")}
            </NavLink>
          </div>
          <Button
            title={t("sign-in.btn-title")}
            style={{ width: "80%" }}
            type="submit"
          />
          <div className={styles.bottom_container}>
            <span className={styles.bottom_container_text}>
              {t("sign-in.under-btn.text")}
            </span>
            <NavLink className={styles.bottom_container_link} to={"/sign-up"}>
              {t("sign-in.under-btn.link")}
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
