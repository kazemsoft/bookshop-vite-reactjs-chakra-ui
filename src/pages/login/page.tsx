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
import { useForm } from "react-hook-form";
import { useSignInMutation } from "@hooks/mutations/auth/useSignInMutation";
import { useNavigate } from "react-router";
import { toaster } from "@components/ui/toaster";

export default function LoginPage() {
  const version = import.meta.env.PACKAGE_VERSION || "0.0.0";
  const { colorMode, toggleColorMode } = useColorMode();
  const login = useSignInMutation();
  const navigate = useNavigate();

  type TFormData = {
    email: string;
    password: string;
  };

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: TFormData) {
    login.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess({ access_token, id_token, refresh_token }) {
          localStorage.setItem("@novin_admin/access_token", access_token);
          localStorage.setItem("@novin_admin/id_token", id_token);
          localStorage.setItem("@novin_admin/refresh_token", refresh_token);
          navigate("/");
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          toaster.create({
            title: "خطای ورود",
            description:
              error?.response?.data?.error_description ||
              `اطلاعات ورود صحیح نمی‌باشد`,
            type: "error",
          });
        },
      }
    );
  }

  return (
    <VStack gap={4} w="full" maxW="sm">
      <Heading>خوش آمدید</Heading>
      <Text color="gray.400" fontSize="sm">
        پنل ادمین ابر نوین، ورود تنها برای مدیران سیستم مجاز می‌باشد.
      </Text>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <VStack gap={4}>
          <Field
            label="ایمیل"
            mt={6}
            invalid={!!errors.email}
            errorText={
              errors.email?.message ||
              "یک ایمیل معتبر وارد نمایید. برای مثال myname@example.com"
            }
          >
            <Input
              {...register("email", {
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email",
                },
              })}
              autoComplete="email"
            />
          </Field>
          <Field
            label="رمز عبور"
            invalid={!!errors.password}
            errorText={errors.password?.message}
          >
            <Input
              type="password"
              {...register("password", { required: "پسورد را وارد نمایید" })}
              autoComplete="current-password"
            />
          </Field>
          <Button
            w="full"
            type="submit"
            loading={login.isPending}
            loadingText="در حال ورود ..."
            disabled={login.isPending}
          >
            ورود
          </Button>
        </VStack>
      </form>
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
