import { skipToken } from "@reduxjs/toolkit/query";
import { useUser } from "@clerk/clerk-react";
import { useGetCurrentUserProfileQuery } from "../store/api/profileApi";
import { useGetCurrentUserAccountQuery } from "../store/api/accountApi";
import { useEffect } from "react";
import { setLoading } from "../store/slices/appUISlice";
import { useAppDispatch } from "./hooks";

type AccountType = "STUDENT" | "TEACHER" | null;

export const useAccountType = (): {
  accountType: AccountType;
  isLoading: boolean;
} => {
  const { user, isLoaded } = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(!isLoaded));
  }, [isLoaded, dispatch]);

  const { data: profileData, isLoading: isProfileDataLoading } =
    useGetCurrentUserProfileQuery(user ? { id: user.id } : skipToken);

  const { data: accountData, isLoading: isAccountLoading } =
    useGetCurrentUserAccountQuery(
      profileData ? { id: profileData.selectedAccountId } : skipToken
    );

  // виправлено: loading істинний, поки щось ще вантажиться або Clerk не готовий
  const isLoading = isAccountLoading || isProfileDataLoading || !isLoaded;

  return {
    accountType: accountData?.type ?? null,
    isLoading,
  };
};
