import { useUser } from "@clerk/clerk-react";
import { useGetCurrentUserProfileQuery } from "../../../../store/api/profileApi";
import { useGetCurrentUserAccountQuery } from "../../../../store/api/accountApi";
import { skipToken } from "@reduxjs/toolkit/query";

const AccountSettings = () => {
  const { user } = useUser();

  //Витягую дані про профіль користувача
  const { data: profileData } = useGetCurrentUserProfileQuery(
    user ? { id: user.id } : skipToken
  );

  //Витягую дані про акаунт користувача
  const { data: accountData } = useGetCurrentUserAccountQuery(
    profileData ? { id: profileData.selectedAccountId } : skipToken
  );

  // console.log(accountData);

  return <div>{accountData?.id}</div>;
};

export default AccountSettings;
