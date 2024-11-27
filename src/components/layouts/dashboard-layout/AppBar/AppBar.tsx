import {
  Center,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Theme,
} from "@chakra-ui/react";
import Logo from "@components/Logo/Logo";
import { ColorModeButton, useColorModeValue } from "@components/ui/color-mode";
import LanguageSwitcher from "@components/ui/language-switcher";
import { FaQuestionCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";

export default function AppBar() {
  const bgColor = useColorModeValue("primary.700", "primary.900");
  return (
    <Theme appearance="dark" w="full">
      <Flex p={2} w="full" bg={bgColor}>
        <Center w="full" maxW="183px">
          <Logo w="120px" mode="dark" />
        </Center>
        <Spacer />
        <HStack gap={1}>
          <LanguageSwitcher />
          <IconButton
            aria-label="Settings"
            size="sm"
            css={{
              _icon: {
                width: "5",
                height: "5",
              },
            }}
            variant="ghost"
          >
            <FaWrench />
          </IconButton>
          <IconButton
            aria-label="Search"
            size="sm"
            css={{
              _icon: {
                width: "5",
                height: "5",
              },
            }}
            variant="ghost"
          >
            <FaSearch />
          </IconButton>
          <IconButton
            aria-label="Help Center"
            size="sm"
            css={{
              _icon: {
                width: "5",
                height: "5",
              },
            }}
            variant="ghost"
          >
            <FaQuestionCircle />
          </IconButton>
          <ColorModeButton />
        </HStack>
      </Flex>
    </Theme>
  );
}
