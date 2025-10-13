import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useGetCurrentUserAccountQuery } from "../store/api/accountApi";

export default function RoleGuard({
  allow,
  fallback = "/dashboard/home",
  children,
}: {
  allow: Array<"STUDENT" | "TEACHER">;
  fallback?: string;
  children: ReactNode;
}) {
  const { data: accountData, isLoading } = useGetCurrentUserAccountQuery();
  const accountType = accountData?.type;

  if (isLoading) return <>{children}</>;
  if (!accountType || !allow.includes(accountType)) {
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
}
