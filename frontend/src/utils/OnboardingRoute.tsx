import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useAppDispatch } from "../hooks/hooks";
import { useEffect } from "react";
import { setLoading } from "../store/slices/appUISlice";

const OnboardingRoute = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(!isLoaded));
  }, [isLoaded, dispatch]);

  if (!isLoaded) return null;

  // Якщо не авторизований — редірект на sign-in
  if (!isSignedIn) return <Navigate to="/sign-in" />;

  // Якщо профіль уже заповнений — редірект на dashboard
  const isProfileFilled = !!user?.firstName && !!user?.lastName;
  if (isProfileFilled) return <Navigate to="/dashboard" />;

  // Інакше показуємо onboarding
  return <Outlet />;
};

export default OnboardingRoute;
