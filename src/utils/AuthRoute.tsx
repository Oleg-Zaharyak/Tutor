import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export const AuthRoute = () => {
  const { isSignedIn } = useUser();
  return isSignedIn ? <Navigate to="/dashboard" /> : <Outlet />;
};
