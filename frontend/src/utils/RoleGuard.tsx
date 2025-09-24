import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAccountType } from "../hooks/useAccountType";

export default function RoleGuard({
  allow,
  fallback = "/dashboard/home",
  children,
}: {
  allow: Array<"STUDENT" | "TEACHER">;
  fallback?: string;
  children: ReactNode;
}) {
  const { accountType, isLoading } = useAccountType();
  if (isLoading) return <>{children}</>;
  if (!accountType || !allow.includes(accountType)) {
    return <Navigate to={fallback} replace />;
  }
  
  return <>{children}</>;
}
