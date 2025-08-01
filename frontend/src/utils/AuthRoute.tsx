import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useAppDispatch } from "../hooks/hooks";
import { useEffect } from "react";
import { setLoading } from "../store/slices/appUISlice";

const AuthRoute = () => {
  const { isSignedIn, isLoaded } = useUser();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(!isLoaded));
  }, [isLoaded, dispatch]);

  if (!isLoaded) {
    return null;
  }

  return isSignedIn ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default AuthRoute;
