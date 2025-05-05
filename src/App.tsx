import styles from "./App.module.scss";
import clsx from "clsx";
import { useAppSelector } from "./utils/hooks";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";

// pages
import NotFoundPage from "./pages/NotFoundPage";
import DashboardLoyaut from "./pages/DashboardPages/DashboardLoyaut";
import { AuthRoute } from "./utils/AuthRoute";
import { AuthLoyaut } from "./pages/AuthPages/AuthLoyaut";
import SignInPage from "./pages/AuthPages/SignInPage";
import SignUpPage from "./pages/AuthPages/SignUpPage";
import ForgotPasswordPage from "./pages/AuthPages/ForgotPasswordPage";

function App() {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div className={clsx(styles.container, styles[`${theme}_theme`])}>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardLoyaut />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route element={<AuthLoyaut />}>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
