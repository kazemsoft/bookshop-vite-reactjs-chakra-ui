import { Button, Card, Input, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@components/ui/color-mode";

export default function AddAuthorCard() {
  const bgColor = useColorModeValue("#F2EDE6", "#322E2B");

  return (
    <Card.Root bg={bgColor} w="full">
      <Card.Header>
        <Card.Title>افزودن نویسنده جدید</Card.Title>
      </Card.Header>
      <Card.Body w="full">
        <VStack gap={4} as="form" w="full">
          <Input placeholder="نام نویسنده" variant="subtle" />
          <Input placeholder="آدرس تصویر نویسنده (اختیاری)" variant="subtle" />
          <Button w="full">افزودن</Button>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
