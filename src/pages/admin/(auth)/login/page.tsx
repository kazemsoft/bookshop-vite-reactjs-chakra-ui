import { Heading, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { Button } from "@components/ui/button";
import { ColorModeButton } from "@components/ui/color-mode";
import { Field } from "@components/ui/field";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toaster } from "@components/ui/toaster";
import appStore from "@stores/appStore";
import { usePostLogin } from "@hooks/mutations/auth/usePostLogin";

export default function LoginPage() {
  const version = import.meta.env.PACKAGE_VERSION || "0.0.0";
  const login = usePostLogin();
  const navigate = useNavigate();
  const setTokens = appStore((state) => state.setTokens);

  type TFormData = {
    identifier: string;
    password: string;
  };

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormData>({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  function onSubmit(data: TFormData) {
    const { identifier, password } = data;
    login.mutate(
      { identifier, password },
      {
        onSuccess({ token, message }) {
          setTokens(token);
          navigate("/admin");
          toaster.create({ description: message, type: "success" });
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (
          error: Error & {
            response?: { data?: { message?: string } };
          }
        ) => {
          toaster.create({
            title: "خطا!",
            description: error?.response?.data?.message || "دسترسی نامعتبر",
            type: "error",
          });
          reset();
        },
      }
    );
  }

  return (
    <VStack gap={4} w="full" maxW="sm">
      <Heading>خوش برگشتید!</Heading>
      <Text color="gray.400" fontSize="xs" textAlign="center">
        برای ورود به حساب کاربری خود اطلاعات زیر را وارد کنید
      </Text>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <VStack gap={4}>
          <Field
            label={"ایمیل یا نام کاربری"}
            mt={6}
            invalid={!!errors.identifier}
            errorText={errors.identifier?.message || "ایمیل نامعتبر است"}
          >
            <Input
              {...register("identifier", {
                required: "ایمیل یا نام کاربری الزامی است",
              })}
              autoComplete="email"
            />
          </Field>
          <Field
            label={"رمز عبور"}
            invalid={!!errors.password}
            errorText={errors.password?.message}
          >
            <Input
              type="password"
              {...register("password", {
                required: "رمز عبور الزامی است",
              })}
              autoComplete="current-password"
            />
          </Field>
          <Button
            w="full"
            type="submit"
            loading={login.isPending}
            loadingText={"در حال ورود..."}
            disabled={login.isPending}
          >
            ورود
          </Button>
        </VStack>
      </form>
      <HStack w="full" justify="space-between">
        <Text opacity={0.2} fontSize="sm">
          نسخه {version}
        </Text>

        <ColorModeButton />
      </HStack>
    </VStack>
  );
}
