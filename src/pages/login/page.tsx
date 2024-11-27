import { Heading, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { Button } from "@components/ui/button";
import { ColorModeButton } from "@components/ui/color-mode";
import { Field } from "@components/ui/field";
import { useForm } from "react-hook-form";
import { useSignInMutation } from "@hooks/mutations/auth/useSignInMutation";
import { useNavigate } from "react-router";
import { toaster } from "@components/ui/toaster";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@components/ui/language-switcher";
import appStore from "@stores/appStore";

export default function LoginPage() {
  const version = import.meta.env.PACKAGE_VERSION || "0.0.0";
  const login = useSignInMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setTokens = appStore((state) => state.setTokens);

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
          setTokens({
            accessToken: access_token,
            refreshToken: refresh_token,
            idToken: id_token,
          });
          navigate("/dashboard");
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          toaster.create({
            title: t("login.loginError"),
            description:
              error?.response?.data?.error_description ||
              t("login.invalidCredential"),
            type: "error",
          });
          reset();
        },
      }
    );
  }

  return (
    <VStack gap={4} w="full" maxW="sm">
      <Heading>{t("login.welcome")}</Heading>
      <Text color="gray.400" fontSize="xs" textAlign="center">
        {t("login.subtitle")}
      </Text>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <VStack gap={4}>
          <Field
            label={t("login.email")}
            mt={6}
            invalid={!!errors.email}
            errorText={errors.email?.message || t("login.invalidEmail")}
          >
            <Input
              {...register("email", {
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: t("login.invalidEmail"),
                },
              })}
              autoComplete="email"
            />
          </Field>
          <Field
            label={t("login.password")}
            invalid={!!errors.password}
            errorText={errors.password?.message}
          >
            <Input
              type="password"
              {...register("password", {
                required: t("login.invalidPassword"),
              })}
              autoComplete="current-password"
            />
          </Field>
          <Button
            w="full"
            type="submit"
            loading={login.isPending}
            loadingText={t("login.inProgressLoginText")}
            disabled={login.isPending}
          >
            {t("login.loginText")}
          </Button>
        </VStack>
      </form>
      <HStack w="full" justify="space-between">
        <Text opacity={0.2} fontSize="sm">
          {t("login.version")} {version}
        </Text>
        <HStack>
          <ColorModeButton />
          <LanguageSwitcher />
        </HStack>
      </HStack>
    </VStack>
  );
}
