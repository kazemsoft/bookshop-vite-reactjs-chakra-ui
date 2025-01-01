import { Box, Container, Text, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@components/ui/color-mode";

export default function Footer() {
  const bgColor = useColorModeValue("#F2EDE6", "#322E2B");
  const year = new Date().getFullYear();
  return (
    <Box bg={bgColor} w="full">
      <Container maxW="container.xl" py={6}>
        <VStack>
          <Text>© {year}، کلیه حقوق محفوظ است.</Text>
          <Text fontSize="xs">
            طراحی و اجرا توسط دانشجو: عرشیا تاجیک. استاد راهنما: پژمان حسینیون
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
