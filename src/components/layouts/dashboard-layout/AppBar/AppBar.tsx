import { Center, Flex, HStack, Spacer } from "@chakra-ui/react";
import Logo from "@components/Logo/Logo";
import { ColorModeButton } from "@components/ui/color-mode";

export default function AppBar() {
  return (
    <Flex p={2} w="full" bg="blue.700">
      <Center w="full" maxW="183px">
        <Logo w="100px" />
      </Center>
      <Spacer />
      <HStack>
        <div>1</div>
        <Center bg="bg.subtle" p={1}>
          2
        </Center>
        <ColorModeButton />
      </HStack>
    </Flex>
  );
}
