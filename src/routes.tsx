import { Navigate, Route, Routes } from "react-router";
import appStore from "@stores/appStore";
import ShopLayout from "@pages/(shop)/layout";
import ShopHomePage from "@pages/(shop)/page";
import BookPage from "@pages/(shop)/book/page";
import AuthLayout from "@pages/admin/(auth)/auth-layout";
import LoginPage from "@pages/admin/(auth)/login/page";
import AdminLayout from "@pages/admin/layout";
import AdminPage from "@pages/admin/page";
import AuthrosPage from "@pages/admin/authors/page";
import EditAuthor from "@pages/admin/authors/edit/[:authorId]/page";

export default function AppRoutes() {
  const isAuth = appStore((state) => state.token);
  return (
    <Routes>
      <Route element={<ShopLayout />}>
        <Route path="/" element={<ShopHomePage />} />
        <Route path="book/:bookId" element={<BookPage />} />
      </Route>
      <Route path="admin" element={isAuth ? <AdminLayout /> : <AuthLayout />}>
        <Route
          path=""
          element={isAuth ? <AdminPage /> : <Navigate to="/admin/login" />}
        />
        <Route path="authors">
          <Route path="" element={<AuthrosPage />} />
          <Route path="edit/:authorId" element={<EditAuthor />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
