import { VStack } from "@chakra-ui/react";
import useGetMe from "@hooks/queries/useGetMe";
import { Outlet } from "react-router";
import AppBar from "./AppBar/AppBar";

export default function DashboardLayout() {
  const me = useGetMe();

  return (
    <VStack w="full" h="full">
      <AppBar />
    </VStack>
  );
}
