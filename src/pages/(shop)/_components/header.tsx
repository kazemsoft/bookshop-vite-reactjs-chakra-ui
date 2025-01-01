import { Box, Container, Flex } from "@chakra-ui/react";
import Logo from "@components/logo/logo";
import SearchBox from "./search";
import CTA from "./cta";
import { useColorModeValue } from "@components/ui/color-mode";

export default function Header() {
  const bgColor = useColorModeValue("#F2EDE6", "#322E2B");
  return (
    <Box bg={bgColor}>
      <Container maxW="container.xl">
        <Flex py={6} alignItems="center" gap={[4, 4, 8]}>
          <Logo w={["40px", "40px", "80px"]} />
          <SearchBox />
          <CTA />
        </Flex>
      </Container>
    </Box>
  );
}
