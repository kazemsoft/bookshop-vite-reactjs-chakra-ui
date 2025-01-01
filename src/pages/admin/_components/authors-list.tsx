import { Card, HStack, IconButton, Input, Table } from "@chakra-ui/react";
import { Avatar } from "@components/ui/avatar";
import { useColorModeValue } from "@components/ui/color-mode";
import useGetAuthors from "@hooks/queries/useGetAuthors";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";

export default function AuthorsList() {
  const bgColor = useColorModeValue("#F2EDE6", "#322E2B");
  const authors = useGetAuthors();
  console.log(authors.data);

  return (
    <Card.Root bg={bgColor}>
      <Card.Header
        display={"flex"}
        justifyContent={"space-between"}
        flexDir="row"
        w="full"
      >
        <Card.Title>لیست نویسندگان موجود:</Card.Title>
        <Input bg="bg.subtle" placeholder="جستجو نویسنده ..." w="150px" />
      </Card.Header>
      <Card.Body>
        <Table.ScrollArea borderWidth="1px" rounded="md" height="full">
          <Table.Root size="sm" stickyHeader>
            <Table.Header>
              <Table.Row bg="bg.subtle">
                <Table.ColumnHeader>تصویر</Table.ColumnHeader>
                <Table.ColumnHeader>نام نویسنده</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">اقدامات</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {authors.data?.map((author) => (
                <Table.Row key={author.id}>
                  <Table.Cell>
                    <Avatar
                      src={author.imageUrl || undefined}
                      name={author.name}
                    />
                  </Table.Cell>
                  <Table.Cell>{author.name}</Table.Cell>
                  <Table.Cell textAlign="end">
                    <HStack gap={2} justify="flex-end">
                      <IconButton size="sm" variant="subtle">
                        <AiOutlineEdit size={20} />
                      </IconButton>
                      <IconButton size="sm" variant="subtle">
                        <AiOutlineDelete size={20} />
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
