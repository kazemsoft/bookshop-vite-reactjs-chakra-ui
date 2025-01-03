import { Container, Grid } from "@chakra-ui/react";
import AddBookCard from "../_components/add-book-card";
import BooksList from "../_components/books-list";

export default function BooksPage() {
  return (
    <Container maxW="container.xl" w="full">
      <Grid
        gridTemplateColumns={["1fr", "1fr", "1fr 3fr"]}
        gap={[4, 4, 8]}
        w="full"
        py={[4, 4, 6]}
      >
        <AddBookCard />
        <BooksList />
      </Grid>
    </Container>
  );
}
