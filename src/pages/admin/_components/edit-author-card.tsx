import { Card, Input, VStack } from "@chakra-ui/react";
import { Button } from "@components/ui/button";
import { useColorModeValue } from "@components/ui/color-mode";
import { Field } from "@components/ui/field";
import { toaster } from "@components/ui/toaster";
import { usePutAuthor } from "@hooks/mutations/authors/usePutAuthor";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { queryClient } from "src/queryClient";

export default function EditAuthorForm({ author }: { author: TAuthor }) {
  const bgColor = useColorModeValue("#F2EDE6", "#322E2B");
  const putAuthor = usePutAuthor();
  const navigator = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string; imageUrl?: string }>({
    mode: "onBlur",
    defaultValues: { name: author.name || "", imageUrl: author.imageUrl || "" },
  });

  function onSubmit({ name, imageUrl }: { name: string; imageUrl?: string }) {
    putAuthor.mutate(
      { id: author.id, name, imageUrl },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["author", author.id] });
          toaster.success({ description: "نویسنده با موفقیت ویرایش شد" });
          setTimeout(() => {
            navigator("/admin/authors");
          }, 1000);
        },
      }
    );
  }

  return (
    <>
      <Card.Root bg={bgColor} w="full">
        <Card.Header>
          <Card.Title>ویرایش نویسنده</Card.Title>
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
              disabled={putAuthor.isPending}
              loading={putAuthor.isPending}
              loadingText="در حال ویرایش"
            >
              ویرایش
            </Button>
          </VStack>
        </Card.Body>
      </Card.Root>
    </>
  );
}
