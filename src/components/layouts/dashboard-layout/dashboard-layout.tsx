import { VStack } from "@chakra-ui/react";
import useGetMe from "@hooks/queries/useGetBooks";
import AppBar from "./AppBar/AppBar";

export default function DashboardLayout() {
  const me = useGetMe();
  console.log(me);

  return (
    <VStack w="full" h="full">
      <AppBar />
    </VStack>
  );
}
