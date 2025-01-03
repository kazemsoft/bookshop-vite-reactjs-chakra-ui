import { Card, HStack, IconButton, Input, Table } from "@chakra-ui/react";
import { Avatar } from "@components/ui/avatar";
import { useColorModeValue } from "@components/ui/color-mode";
import { ProgressBar, ProgressRoot } from "@components/ui/progress";
import { toaster } from "@components/ui/toaster";
import { useDeleteBook } from "@hooks/mutations/books/useDeleteBook";
import useGetBooks from "@hooks/queries/useGetBooks";
import { useDebounce } from "@hooks/useDebounce";
import { formatPrice } from "@utils/numbers";
import { useEffect, useId, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { Link, useNavigate, useSearchParams } from "react-router";
import { queryClient } from "src/queryClient";

export default function BooksList() {
  const id = useId();
  const bgColor = useColorModeValue("#F2EDE6", "#322E2B");
  const books = useGetBooks();
  const deleteBook = useDeleteBook();
  async function handleDeleteBook(id: number) {
    deleteBook.mutate(
      { bookId: id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["books"] });
        },
      }
    );
  }
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const [search, setSearch] = useState(q || "");
  const navigate = useNavigate();

  const searchAfterSeconds = useDebounce(search, 500);

  useEffect(() => {
    searchParams.set("q", searchAfterSeconds);
    navigate({ search: searchParams.toString() });
  }, [searchAfterSeconds, navigate, searchParams]);

  return (
    <Card.Root bg={bgColor}>
      <Card.Header
        display={"flex"}
        justifyContent={"space-between"}
        flexDir="row"
        w="full"
      >
        <Card.Title>لیست کتاب‌های موجود:</Card.Title>
        <Input
          bg="bg.subtle"
          placeholder="جستجو کتاب ..."
          w="150px"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Card.Header>
      <Card.Body>
        <ProgressRoot
          value={books.isLoading || books.isFetching ? null : 0}
          h={1}
        >
          <ProgressBar />
        </ProgressRoot>
        <Table.ScrollArea borderWidth="1px" rounded="md" height="full">
          <Table.Root size="sm" stickyHeader>
            <Table.Header>
              <Table.Row bg="bg.subtle">
                <Table.ColumnHeader>تصویر</Table.ColumnHeader>
                <Table.ColumnHeader>عنوان کتاب</Table.ColumnHeader>
                <Table.ColumnHeader>نام نویسنده</Table.ColumnHeader>
                <Table.ColumnHeader>قیمت کتاب</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">اقدامات</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {books.data?.map((book) => (
                <Table.Row key={book.id}>
                  <Table.Cell>
                    <Avatar
                      src={book.imageUrl || undefined}
                      name={book.title}
                      shape="rounded"
                    />
                  </Table.Cell>
                  <Table.Cell>{book.title}</Table.Cell>
                  <Table.Cell>{book.Author.name}</Table.Cell>
                  <Table.Cell>
                    {formatPrice(Number(book.price) * 1000)} تومان
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    <HStack gap={2} justify="flex-end">
                      <Link to={`/admin/books/edit/${book.id}`}>
                        <IconButton size="sm" variant="subtle">
                          <AiOutlineEdit size={20} />
                        </IconButton>
                      </Link>
                      <IconButton size="sm" variant="subtle">
                        <AiOutlineDelete
                          onClick={() => {
                            toaster.create({
                              id,
                              title: "حذف نویسنده",
                              description: "آیا از حذف نویسنده مطمئن هستید؟!",
                              type: "warning",
                              action: {
                                label: "بله",
                                onClick: () => {
                                  handleDeleteBook(book.id);
                                },
                              },
                            });
                          }}
                          size={20}
                        />
                      </IconButton>
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Card.Body>
    </Card.Root>
  );
}
