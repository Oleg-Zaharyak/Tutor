import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../hooks/use-auth";

export const PrivateRoute = () => {
  const isAuth = true;

  return isAuth ? <Outlet /> : <Navigate to="/sign-in" />;
};
