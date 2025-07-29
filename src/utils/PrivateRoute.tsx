import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export const PrivateRoute = () => {
  const { isSignedIn } = useUser();
  return isSignedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};
