import { VStack } from "@chakra-ui/react";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <VStack w="full" h="full" justify="center" gap={4}>
      <Outlet />
    </VStack>
  );
}
