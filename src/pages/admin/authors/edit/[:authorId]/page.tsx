import { Container, Flex } from "@chakra-ui/react";
import CenterProgress from "@components/Progress/CenterProgress/CenterProgress";
import useGetAuthor from "@hooks/queries/useGetAuthor";
import EditAuthorForm from "@pages/admin/_components/edit-author-card";

export default function EditAuthor() {
  const author = useGetAuthor();
  return (
    <Container maxW="md" w="full" h="full">
      <Flex justify="center" align="center" w="full" h="full">
        {author?.data ? (
          <EditAuthorForm author={author.data} />
        ) : (
          <CenterProgress />
        )}
      </Flex>
    </Container>
  );
}
