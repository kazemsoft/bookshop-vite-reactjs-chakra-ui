import { Route, Routes } from "react-router";
// import appStore from "@stores/appStore";
import ShopLayout from "@pages/(shop)/layout";
import ShopHomePage from "@pages/(shop)/page";
import BookPage from "@pages/(shop)/book/page";

export default function AppRoutes() {
  // const isAuth = appStore((state) => state.token);
  return (
    <Routes>
      <Route element={<ShopLayout />}>
        <Route path="/" element={<ShopHomePage />} />
        <Route path="book/:bookId" element={<BookPage />} />
      </Route>
    </Routes>
  );
}
