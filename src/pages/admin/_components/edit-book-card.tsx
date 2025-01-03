import { Card, Input, VStack } from "@chakra-ui/react";
import { Button } from "@components/ui/button";
import { useColorModeValue } from "@components/ui/color-mode";
import { Field } from "@components/ui/field";
import { toaster } from "@components/ui/toaster";
import { usePutBook } from "@hooks/mutations/books/usePutBook";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { queryClient } from "src/queryClient";

export default function EditBookCard({ book }: { book: TBook }) {
  const bgColor = useColorModeValue("#F2EDE6", "#322E2B");
  const putBook = usePutBook();
  const navigator = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TBook>({
    mode: "onBlur",
    defaultValues: { title: book.title || "", imageUrl: book.imageUrl || "" },
  });

  function onSubmit(bookData: TBook) {
    putBook.mutate(
      { id: book.id, ...bookData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["book", book.id] });
          toaster.success({ description: "کتاب با موفقیت ویرایش شد" });
          setTimeout(() => {
            navigator("/admin/books");
          }, 1000);
        },
      }
    );
  }

  return (
    <>
      <Card.Root bg={bgColor} w="full">
        <Card.Header>
          <Card.Title>ویرایش کتاب</Card.Title>
        </Card.Header>
        <Card.Body w="full">
          <VStack gap={4} as="form" w="full" onSubmit={handleSubmit(onSubmit)}>
            <Field
              invalid={!!errors.title}
              errorText={errors.title?.message?.toString()}
              label="عنوان کتاب"
              required
            >
              <Input
                placeholder="عنوان کتاب"
                variant="subtle"
                {...register("title", { required: "نام نویسنده اجباری است" })}
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
              disabled={putBook.isPending}
              loading={putBook.isPending}
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
