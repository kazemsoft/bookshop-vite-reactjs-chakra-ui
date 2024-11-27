import { Navigate, Route, Routes } from "react-router";
import AuthLayout from "./components/layouts/auth-layout/auth-layout";
import LoginPage from "./pages/login/page";
import DashboardLayout from "./components/layouts/dashboard-layout/dashboard-layout";
import DashboardHomePage from "./pages/dashboard";
import appStore from "@stores/appStore";

export default function AppRoutes() {
  const isAuth = appStore((state) => state.accessToken);
  return (
    <Routes>
      <Route element={isAuth ? <Navigate to="/dashboard" /> : <AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route
        path="dashboard"
        element={isAuth ? <DashboardLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<DashboardHomePage />} />
      </Route>
      <Route
        path="*"
        element={<Navigate to={isAuth ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}
