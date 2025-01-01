import { Grid, VStack } from "@chakra-ui/react";
import CenterProgress from "@components/Progress/CenterProgress/CenterProgress";
import useGetBook from "@hooks/queries/useGetBook";
import BookBriefInfo from "../_components/book-brief-info";
import BookSidebar from "../_components/book-sidebar";
import BookDescription from "../_components/book-description";

export default function BookPage() {
  const book = useGetBook();

  if (book.isLoading)
    return (
      <CenterProgress
        w="full"
        h={[
          "calc(100vh - 220px)",
          "calc(100vh - 220px)",
          "calc(100vh - 270px)",
        ]}
      />
    );
  return (
    <Grid gridTemplateColumns={["1fr", "1fr", "2fr 1fr"]} gap={4} mt={10}>
      <VStack w="full">
        <BookBriefInfo />
        <BookDescription />
      </VStack>
      <BookSidebar />
    </Grid>
  );
}
