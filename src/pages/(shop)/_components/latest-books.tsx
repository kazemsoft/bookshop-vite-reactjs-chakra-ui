import { Grid, Heading, Skeleton, VStack } from "@chakra-ui/react";
import useGetBooks from "@hooks/queries/useGetBooks";
import BookCard from "./book-card";

export default function LatestBooks() {
  const books = useGetBooks();

  console.log(books.data);

  return (
    <VStack w="full" alignItems="flex-start" gap={[4, 4, 8]}>
      <Heading
        as="h2"
        fontWeight={[700, 700, 900]}
        fontSize={["xl", "2xl", "2xl"]}
      >
        آخرین کتاب‌ها:
      </Heading>
      <Grid
        w="full"
        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={4}
      >
        {books.isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton key={item} height="350px" w="full" />
            ))}
          </>
        ) : (
          books.data?.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </Grid>
    </VStack>
  );
}
