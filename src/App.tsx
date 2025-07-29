import styles from "./App.module.scss";
import clsx from "clsx";
import { useAppSelector } from "./hooks/hooks";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";
import { AuthRoute } from "./utils/AuthRoute";

import Loader from "./components/Loader";

import {
  SignInPage,
  SignUpPage,
  ForgotPasswordPage,
  AuthLoyaut,
  ResetPasswordPage,
  SuccessfulPasswordResetPage,
} from "./pages/AuthPages";

import {
  Main,
  Students,
  Calendar,
  Chat,
  Whiteboards,
  Statistic,
  Files,
  Quizzes,
  Settings,
  DashboardLoyaut,
} from "./pages/DashboardPages";

function App() {
  const { theme } = useAppSelector((state) => state.theme);
  const { isLoading } = useAppSelector((state) => state.appUI);

  return (
    <div className={clsx(styles.container, styles[`${theme}_theme`])}>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardLoyaut />}>
            <Route index element={<Main />} />
            <Route path="students" element={<Students />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="chats" element={<Chat />} />
            <Route path="whiteboards" element={<Whiteboards />} />
            <Route path="statistic" element={<Statistic />} />
            <Route path="files" element={<Files />} />
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        <Route element={<AuthRoute />}>
          <Route element={<AuthLoyaut />}>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route
              path="/successful-password-reset"
              element={<SuccessfulPasswordResetPage />}
            />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
      {isLoading && <Loader />}
    </div>
  );
}

export default App;
