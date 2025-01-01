import { Heading, Text, VStack } from "@chakra-ui/react";
import useGetBook from "@hooks/queries/useGetBook";
import { useColorModeValue } from "@components/ui/color-mode";

export default function BookDescription() {
  const book = useGetBook();
  const bgColor = useColorModeValue("#F2EDE6", "#322E2B");
  return (
    <VStack bg={bgColor} borderRadius="md" p={8} gap={8} w="full" alignItems="flex-start">
      <Heading as="h3" fontSize="xl">دربارۀ {book.data?.title}</Heading>
      <Text fontSize="sm" lineHeight="2em" textAlign="justify">{book.data?.description}</Text>
    </VStack>
  );
}
