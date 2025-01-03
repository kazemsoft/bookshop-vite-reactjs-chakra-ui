import {
  Card,
  createListCollection,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Button } from "@components/ui/button";
import { useColorModeValue } from "@components/ui/color-mode";
import { Field } from "@components/ui/field";
import { usePostBook } from "@hooks/mutations/books/usePostBook";
import { useForm } from "react-hook-form";
import useGetAuthors from "@hooks/queries/useGetAuthors";
import { queryClient } from "src/queryClient";
import { useMemo } from "react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@components/ui/select";

export default function AddBookCard() {
  const bgColor = useColorModeValue("#F2EDE6", "#322E2B");
  const postBook = usePostBook();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RemoveAttribute<TBook, "id">>({ mode: "all" });
  const authors = useGetAuthors();
  const authrosOptions = useMemo(() => {
    return createListCollection({
      items: Array.isArray(authors.data)
        ? authors.data.map((author) => ({
            label: author.name,
            value: String(author.id),
          }))
        : [],
    });
  }, [authors.data]);

  function onSubmit(book: RemoveAttribute<TBook, "id">) {
    postBook.mutate(book, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["books", ""] });
        reset();
      },
    });
  }

  return (
    <Card.Root bg={bgColor} w="full">
      <Card.Header>
        <Card.Title>افزودن کتاب جدید</Card.Title>
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
              {...register("title", { required: "عنوان کتاب اجباری است" })}
            />
          </Field>
          <Field
            label="نویسنده"
            required
            invalid={!!errors.authorId}
            errorText={errors.authorId?.message?.toString()}
          >
            <SelectRoot
              value={
                getValues("authorId")
                  ? [String(getValues("authorId"))]
                  : undefined
              }
              onValueChange={(e) => setValue("authorId", Number(e.value[0]))}
              collection={authrosOptions}
              variant="subtle"
              css={{
                "& label": {
                  direction: "rtl",
                },
                "& button": {
                  direction: "rtl",
                },
                "& .chakra-select__indicatorGroup": {
                  left: 0,
                  right: "unset",
                },
                "& .chakra-select__item": {
                  direction: "rtl !important",
                },
              }}
            >
              <SelectTrigger>
                <SelectValueText placeholder="انتخاب نویسنده" />
              </SelectTrigger>
              <SelectContent>
                {authrosOptions.items.map((author) => (
                  <SelectItem item={author} key={author.value}>
                    {author.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Field>
          <Field
            label="قیمت کتاب"
            required
            invalid={!!errors.price}
            errorText={errors.price?.message?.toString()}
          >
            <Input
              placeholder="قیمت کتاب (تومان)"
              type="number"
              variant="subtle"
              {...register("price", { required: "قیمت کتاب را وارد کنید" })}
            />
          </Field>
          <Field label="آدرس تصویر کتاب">
            <Input
              placeholder="آدرس تصویر کتاب (اختیاری)"
              variant="subtle"
              {...register("imageUrl")}
            />
          </Field>
          <Field
            label="توضیحات کتاب"
            required
            invalid={!!errors.description}
            errorText={errors.description?.message?.toString()}
          >
            <Textarea
              placeholder="توضیحات کتاب"
              variant="subtle"
              {...register("description", {
                required: "توضیحات مختصری در مورد کتاب بنویسید",
              })}
              rows={8}
            />
          </Field>
          <Button
            w="full"
            type="submit"
            loading={postBook.isPending}
            loadingText="در حال افزون ..."
          >
            افزودن
          </Button>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
