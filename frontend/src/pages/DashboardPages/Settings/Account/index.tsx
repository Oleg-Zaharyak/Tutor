import { useGetCurrentUserAccountQuery } from "../../../../store/api/accountApi";

const AccountSettings = () => {
  //Витягую дані про акаунт користувача
  const { data: accountData } = useGetCurrentUserAccountQuery();

  // console.log(accountData);

  return <div>{accountData?.id}</div>;
};

export default AccountSettings;
