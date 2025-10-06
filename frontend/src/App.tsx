import styles from "./App.module.scss";
import clsx from "clsx";
import { useAppSelector } from "./hooks/hooks";
import { Navigate, Route, Routes } from "react-router-dom";

import PrivateRoute from "./utils/PrivateRoute";
import AuthRoute from "./utils/AuthRoute";
import OnboardingRoute from "./utils/OnboardingRoute";

import Loader from "./components/Loader";

import {
  SignInPage,
  SignUpPage,
  ForgotPasswordPage,
  AuthLoyaut,
  ResetPasswordPage,
  EmailVerifyPage,
} from "./pages/AuthPages";

import {
  Main,
  Students,
  Teachers,
  Calendar,
  Chat,
  Whiteboards,
  Statistic,
  Files,
  Quizzes,
  Settings,
  DashboardLoyaut,
} from "./pages/DashboardPages";
import UserOnboardingPage from "./pages/UserOnboardingPage";
import SecuritySettings from "./pages/DashboardPages/Settings/Security";
import AccountSettings from "./pages/DashboardPages/Settings/Account";
import ProfileSettings from "./pages/DashboardPages/Settings/Profile";
import RoleGuard from "./utils/RoleGuard";
// import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const { theme } = useAppSelector((state) => state.theme);
  const { isLoading } = useAppSelector((state) => state.appUI);

  return (
    <div className={clsx(styles.container, styles[`${theme}_theme`])}>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route element={<AuthLoyaut />}>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/email-verify" element={<EmailVerifyPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>
        </Route>

        <Route element={<OnboardingRoute />}>
          <Route path="/user-onboarding" element={<UserOnboardingPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardLoyaut />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Main />} />
            <Route
              path="students"
              element={
                <RoleGuard allow={["TEACHER"]} fallback="/dashboard/teachers">
                  <Students />
                </RoleGuard>
              }
            />
            <Route
              path="teachers"
              element={
                <RoleGuard allow={["STUDENT"]} fallback="/dashboard/students">
                  <Teachers />
                </RoleGuard>
              }
            />
            <Route path="calendar" element={<Calendar />} />
            <Route path="chats" element={<Chat />} />
            <Route path="whiteboards" element={<Whiteboards />} />
            <Route path="statistic" element={<Statistic />} />
            <Route path="files" element={<Files />} />
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="settings" element={<Settings />}>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="account" element={<AccountSettings />} />
              <Route path="security" element={<SecuritySettings />} />
            </Route>
          </Route>
        </Route>

        {/* <Route path="*" element={<NotFoundPage />} /> */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
      {isLoading && <Loader />}
    </div>
  );
}

export default App;
