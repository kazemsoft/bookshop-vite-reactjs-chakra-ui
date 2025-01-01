import { Image, Stack, Text, VStack } from "@chakra-ui/react";
import useGetBook from "@hooks/queries/useGetBook";
import BookCTAButtons from "./book-cta-buttons";
import { useColorModeValue } from "@components/ui/color-mode";

export default function BookBriefInfo() {
  const book = useGetBook();
  const bgColor = useColorModeValue("#F2EDE6", "#322E2B");
  return (
    <Stack
      direction={["column", "column", "row"]}
      bg={bgColor}
      borderRadius="md"
      p={8}
      gap={8}
      w="full"
    >
      <Image
        src={book.data?.imageUrl || ""}
        alt={book.data?.title}
        borderRadius="md"
        h={["300px", "300px", "300px"]}
        w="auto"
        fit="contain"
        mt={-14}
      />
      <VStack
        h="full"
        justify="flex-start"
        alignItems="flex-start"
        gap={6}
        flex={1}
      >
        <Text fontWeight={900} as="h2" fontSize="xl">
          {book.data?.title}
        </Text>
        <Text fontSize="sm" textAlign="justify" as="p">
          نویسنده: {book.data?.Author.name}
        </Text>
        <Text fontSize="sm" textAlign="justify" as="p">
          مترجم: -
        </Text>
        <Text fontSize="sm" textAlign="justify" as="p">
          ناشر: -
        </Text>
      </VStack>
      <BookCTAButtons />
    </Stack>
  );
}
