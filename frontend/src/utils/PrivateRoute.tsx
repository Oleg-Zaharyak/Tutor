import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { setLoading } from "../store/slices/appUISlice";
import { useAppDispatch } from "../hooks/hooks";

const PrivateRoute = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(!isLoaded));
  }, [isLoaded, dispatch]);

  if (!isLoaded) return null;

  // Якщо не авторизований — редірект на sign-in
  if (!isSignedIn) return <Navigate to="/sign-in" />;

  // Якщо авторизований, але не має імені або прізвища — редірект на onboarding
  const isProfileFilled = !!user?.firstName && !!user?.lastName;
  if (!isProfileFilled) return <Navigate to="/user-onboarding" />;

  // Все добре — показуємо вкладений маршрут
  return <Outlet />;
};

export default PrivateRoute;
