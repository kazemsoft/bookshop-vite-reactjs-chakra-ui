import { Container, Grid } from "@chakra-ui/react";
import AddAuthorCard from "../_components/add-author-card";
import AuthorsList from "../_components/authors-list";

export default function AuthrosPage() {
  return (
    <Container maxW="container.xl" w="full" h="full">
      <Grid
        gridTemplateColumns={["1fr", "1fr", "1fr 3fr"]}
        gap={[4, 4, 8]}
        w="full"
        py={[4, 4, 6]}
      >
        <AddAuthorCard />
        <AuthorsList />
      </Grid>
    </Container>
  );
}
