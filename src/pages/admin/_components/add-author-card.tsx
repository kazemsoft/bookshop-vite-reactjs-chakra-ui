import { Card, Input, VStack } from "@chakra-ui/react";
import { Button } from "@components/ui/button";
import { useColorModeValue } from "@components/ui/color-mode";
import { Field } from "@components/ui/field";
import { usePostAuthor } from "@hooks/mutations/authors/usePostAuthor";
import { useForm } from "react-hook-form";
import { queryClient } from "src/queryClient";

export default function AddAuthorCard() {
  const bgColor = useColorModeValue("#F2EDE6", "#322E2B");
  const postAuthor = usePostAuthor();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ name: string; imageUrl?: string }>({ mode: "onBlur" });

  function onSubmit(author: { name: string; imageUrl?: string }) {
    postAuthor.mutate(author, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["authors"] });
        reset();
      },
    });
  }

  return (
    <Card.Root bg={bgColor} w="full">
      <Card.Header>
        <Card.Title>افزودن نویسنده جدید</Card.Title>
      </Card.Header>
      <Card.Body w="full">
        <VStack gap={4} as="form" w="full" onSubmit={handleSubmit(onSubmit)}>
          <Field
            invalid={!!errors.name}
            errorText={errors.name?.message?.toString()}
            label="نام نویسنده"
            required
          >
            <Input
              placeholder="نام نویسنده"
              variant="subtle"
              {...register("name", { required: "نام نویسنده اجباری است" })}
            />
          </Field>
          <Field label="آدرس تصویر نویسنده">
            <Input
              placeholder="آدرس تصویر نویسنده (اختیاری)"
              variant="subtle"
              {...register("imageUrl")}
            />
          </Field>
          <Button
            w="full"
            type="submit"
            loading={postAuthor.isPending}
            loadingText="در حال افزون ..."
          >
            افزودن
          </Button>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
