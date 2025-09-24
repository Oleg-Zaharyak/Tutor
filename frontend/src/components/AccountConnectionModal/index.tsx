import { FC } from "react";
import styles from "./styles.module.scss";
import { AccountConnectionModalProps } from "./types";
import Button from "../Button";
import Input from "../Input";
import { RxCross2 } from "react-icons/rx";
import { useFormik } from "formik";
import { AccountConnectionSchema } from "./schema";
import { useAppDispatch } from "../../hooks/hooks";
import { useCreateAccountConnectionMutation } from "../../store/api/connectionApi";
import { setLoading } from "../../store/slices/appUISlice";
import { useTranslation } from "react-i18next";
import { ApiError } from "../../types/apiError";

const AccountConnectionModal: FC<AccountConnectionModalProps> = ({
  accountType,
  accountId,
  onClose,
}) => {
  const { t } = useTranslation(["common", "endpointErrors"]);
  const dispatch = useAppDispatch();
  const [createAccountConnection] = useCreateAccountConnectionMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: AccountConnectionSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      dispatch(setLoading(true));
      try {
        await createAccountConnection({
          currentAccountId: accountId,
          targetEmail: values.email,
        }).unwrap();

        onClose();
      } catch (errors) {
        if (errors !== null) {
          const error = (errors as { data?: ApiError }).data;

          console.log(error);

          const msg = error?.error_code
            ? t(`account-connection.${error.error_code}`, {
                ns: "endpointErrors",
              })
            : error?.error_message ||
              t("account-connection.default", {
                ns: "endpointErrors",
              });

          setErrors({ email: msg });
        } else {
          setErrors({
            email: t("account-connection.default", {
              ns: "endpointErrors",
            }),
          });
        }
      } finally {
        dispatch(setLoading(false));
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <RxCross2 onClick={onClose} className={styles.modal_btns_close} />
        <h1 className={styles.modal_title}>
          {t(`account-connection-modal.title.${accountType}`, { ns: "common" })}
        </h1>
        <form className={styles.modal_form} onSubmit={formik.handleSubmit}>
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              Boolean(formik.errors.email) && Boolean(formik.touched.email)
            }
            errorText={formik.errors.email}
            title={t("account-connection-modal.email.title", { ns: "common" })}
            inputSize="medium"
            placeholder={t("account-connection-modal.email.placeholder", {
              ns: "common",
            })}
          />
          <Button
            type="submit"
            size="medium"
            title={t(`account-connection-modal.btn-title.${accountType}`, {
              ns: "common",
            })}
          />
        </form>
      </div>
    </div>
  );
};
export default AccountConnectionModal;
