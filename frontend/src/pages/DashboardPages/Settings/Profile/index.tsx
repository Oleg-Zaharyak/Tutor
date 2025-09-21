import styles from "./styles.module.scss";

import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../../../utils/date";

import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import Textarea from "../../../../components/Textarea";
import { CreatedAtSkeleton, MainUserInfoSkeleton } from "./skeleton";
import { HiOutlineUserCircle } from "react-icons/hi";

import { useUser } from "@clerk/clerk-react";
import {
  useGetCurrentUserProfileQuery,
  useUpdateProfileMutation,
} from "../../../../store/api/profileApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAppDispatch } from "../../../../hooks/hooks";
import { setLoading } from "../../../../store/slices/appUISlice";
// import { ProfileSettingsSchema } from "./schema";

const ProfileSettings = () => {
  const { user, isLoaded } = useUser();
  const { t } = useTranslation("settings");
  const dispatch = useAppDispatch();

  const userId = user?.id || "";

  const { data: profileData, isLoading: isProfileDataLoading } =
    useGetCurrentUserProfileQuery(user ? { id: user.id } : skipToken);

  const [updateProfile] = useUpdateProfileMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: profileData?.firstName || "",
      lastName: profileData?.lastName || "",
      birthDate: profileData?.birthDate
        ? new Date(profileData.birthDate).toISOString().split("T")[0]
        : "",
      address: profileData?.address || "",
      phoneNumber: profileData?.phoneNumber || "",
      bio: profileData?.bio || "",
    },
    // validationSchema: ProfileSettingsSchema,
    onSubmit: async (values) => {
      dispatch(setLoading(true));
      const changedValues = Object.fromEntries(
        Object.entries(values)
          .filter(
            ([key, value]) =>
              value.trim() !== formik.initialValues[key as keyof typeof values]
          )
          .map(([key, value]) => {
            if (key === "birthDate") {
              return [key, value ? new Date(value as string) : null];
            }
            if (typeof value === "string") {
              return [key, value.trim()];
            }
            return [key, value];
          })
      );

      try {
        await updateProfile({
          profileId: userId,
          data: changedValues,
        }).unwrap();
      } catch (err) {
        console.error("Помилка оновлення:", err);
      } finally {
        dispatch(setLoading(false));
      }
    },
  });

  const commonConfig = {
    size: "medium" as const,
    onBlur: formik.handleBlur,
    onChange: formik.handleChange,
  };
  const inputsConfig = [
    {
      name: "firstName",
      title: t("profile.first-name.title"),
      placeholder: t("profile.first-name.placeholder"),
      value: formik.values.firstName,
      containerClassName: styles.firstName,
      error:
        Boolean(formik.errors.firstName) && Boolean(formik.touched.firstName),
      errorText: formik.errors.firstName,
    },
    {
      name: "lastName",
      title: t("profile.last-name.title"),
      placeholder: t("profile.last-name.placeholder"),
      value: formik.values.lastName,
      containerClassName: styles.lastName,
      error:
        Boolean(formik.errors.firstName) && Boolean(formik.touched.firstName),
      errorText: formik.errors.firstName,
    },
    {
      name: "birthDate",
      inputType: "date",
      title: t("profile.date-of-birth.title"),
      placeholder: t("profile.date-of-birth.placeholder"),
      value: formik.values.birthDate,
      containerClassName: styles.birthDate,
      inputClassName: styles.birthDate_input,
      error:
        Boolean(formik.errors.birthDate) && Boolean(formik.touched.birthDate),
      errorText: formik.errors.birthDate,
    },
    {
      name: "phoneNumber",
      title: t("profile.phone-number.title"),
      placeholder: t("profile.phone-number.placeholder"),
      value: formik.values.phoneNumber,
      containerClassName: styles.phoneNumber,
      error:
        Boolean(formik.errors.phoneNumber) &&
        Boolean(formik.touched.phoneNumber),
      errorText: formik.errors.phoneNumber,
    },
    {
      name: "address",
      title: t("profile.address.title"),
      placeholder: t("profile.address.placeholder"),
      value: formik.values.address,
      containerClassName: styles.address,
      error:
        Boolean(formik.errors.phoneNumber) &&
        Boolean(formik.touched.phoneNumber),
      errorText: formik.errors.phoneNumber,
    },
  ];

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.content}>
        {!isProfileDataLoading && isLoaded ? (
          <div className={styles.top_container}>
            <HiOutlineUserCircle className={styles.user_avatar} />
            <div className={styles.user_field}>
              <div className={styles.user_field_name}>
                {profileData?.fullName}
              </div>
              <div className={styles.user_field_email}>
                {profileData?.email}
              </div>
            </div>
          </div>
        ) : (
          <MainUserInfoSkeleton />
        )}
        <div className={styles.inputs}>
          {inputsConfig.map((item) => (
            <Input {...commonConfig} {...item} />
          ))}
          <Textarea
            name="bio"
            title={t("profile.add-info.title")}
            placeholder={t("profile.add-info.placeholder")}
            value={formik.values.bio}
            containerClassName={styles.textarea}
            lableClassName={styles.textarea_lable}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className={styles.bottom_container}>
        <div className={styles.meta}>
          <div className={styles.meta_lable}>
            {t("profile.ptrofile-created")}
          </div>
          {!isProfileDataLoading && isLoaded ? (
            <div className={styles.meta_value}>
              {profileData && formatDate(profileData?.createdAt)}
            </div>
          ) : (
            <CreatedAtSkeleton />
          )}
        </div>
        {formik.dirty && (
          <div className={styles.buttons}>
            <Button
              title={t("profile.cancel-btn-title")}
              styleType="warning"
              size="medium"
              onClick={() => formik.resetForm()}
            />
            <Button
              title={t("profile.update-btn-title")}
              styleType="outline"
              type="submit"
              size="medium"
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default ProfileSettings;
