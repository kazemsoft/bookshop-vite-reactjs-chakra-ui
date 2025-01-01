import { VStack } from "@chakra-ui/react";
import Footer from "@pages/(shop)/_components/footer";
import Header from "@pages/(shop)/_components/header";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <VStack w="full" h="full">
      <Header />
      <Outlet />
      <Footer />
    </VStack>
  );
}
