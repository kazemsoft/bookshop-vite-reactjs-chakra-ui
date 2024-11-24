import {
  Heading,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Button } from "@components/ui/button";
import { useColorMode } from "@components/ui/color-mode";
import { Field } from "@components/ui/field";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";

export default function LoginPage() {
  const version = import.meta.env.PACKAGE_VERSION || "0.0.0";
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <VStack gap={4} w="full" maxW="sm">
      <Heading>خوش آمدید</Heading>
      <Text color="gray.400" fontSize="sm">
        پنل ادمین ابر نوین، ورود تنها برای مدیران سیستم مجاز می‌باشد.
      </Text>
      <Field label="نام کاربری" mt={6}>
        <Input />
      </Field>
      <Field label="رمز عبور">
        <Input />
      </Field>
      <Button w="full">ورود</Button>
      <HStack w="full" justify="center">
        <Text opacity={0.2} fontSize="xs">
          ورژن: {version}
        </Text>
        <IconButton onClick={toggleColorMode} variant="plain">
          {colorMode === "dark" ? <CiLight /> : <CiDark />}
        </IconButton>
      </HStack>
    </VStack>
  );
}
