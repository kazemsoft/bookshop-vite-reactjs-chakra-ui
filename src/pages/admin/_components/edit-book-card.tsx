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
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@components/ui/select";
import { toaster } from "@components/ui/toaster";
import { usePutBook } from "@hooks/mutations/books/usePutBook";
import useGetAuthors from "@hooks/queries/useGetAuthors";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { queryClient } from "src/queryClient";

type TForm = {
  title: string;
  description: string;
  price: string;
  imageUrl: string | null;
  authorId: string;
};

export default function EditBookCard({ book }: { book: TBook }) {
  const bgColor = useColorModeValue("#F2EDE6", "#322E2B");
  const putBook = usePutBook();
  const navigator = useNavigate();
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

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<TForm>({
    mode: "onBlur",
    defaultValues: {
      title: book.title || "",
      imageUrl: book.imageUrl || "",
      authorId: String(book.authorId),
      description: book.description || "",
      price: String(Number.parseInt(book.price)),
    },
  });

  function onSubmit(bookData: TForm) {
    putBook.mutate(
      {
        id: book.id,
        title: bookData.title,
        imageUrl: bookData.imageUrl || null,
        authorId: Number(bookData.authorId),
        description: bookData.description,
        price: Number(bookData.price),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["book", String(book.id)],
          });
          toaster.success({ description: "کتاب با موفقیت ویرایش شد" });
          setTimeout(() => {
            navigator("/admin/books");
          }, 2000);
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
                onValueChange={(e) => setValue("authorId", e.value[0])}
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
