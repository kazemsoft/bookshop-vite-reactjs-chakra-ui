import { Container, Flex } from "@chakra-ui/react";
import CenterProgress from "@components/Progress/CenterProgress/CenterProgress";
import useGetBook from "@hooks/queries/useGetBook";
import EditBookCard from "@pages/admin/_components/edit-book-card";

export default function EditBook() {
  const book = useGetBook();
  return (
    <Container maxW="md" w="full" h="full">
      <Flex justify="center" align="center" w="full" h="full">
        {book?.data ? <EditBookCard book={book.data} /> : <CenterProgress />}
      </Flex>
    </Container>
  );
}
