import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../constants/variables";
// import { useAuth } from "../hooks/use-auth";

export const AuthRoute = () => {
  return isAuth ? <Navigate to="/dashboard" /> : <Outlet />;
};
