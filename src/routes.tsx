import { Route, Routes } from "react-router";
import AuthLayout from "./components/layouts/auth-layout/auth-layout";
import LoginPage from "./pages/login/page";
import DashboardLayout from "./components/layouts/dashboard-layout/dashboard-layout";
import DashboardHomePage from "./pages/dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>

      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHomePage />} />
      </Route>
    </Routes>
  );
}
