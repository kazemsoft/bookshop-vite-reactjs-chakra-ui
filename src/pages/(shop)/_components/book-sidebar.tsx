import { Button, Flex, Skeleton, Spacer, Text, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@components/ui/color-mode";
import useGetBook from "@hooks/queries/useGetBook";
import { formatPrice } from "@utils/numbers";

export default function BookSidebar() {
  const bgColor = useColorModeValue("#F2EDE6", "#322E2B");
  const book = useGetBook();
  return (
    <VStack bg={bgColor} borderRadius="md" p={6} gap={4} h="fit-content">
      <Flex w="full">
        <Text fontWeight={700}>قیمت:</Text>
        <Spacer />
        <Skeleton loading={book.isLoading}>
          {book.data?.price && (
            <Text fontSize="xl" fontWeight={900}>
              {formatPrice(Number(book.data.price))} تومان
            </Text>
          )}
        </Skeleton>
      </Flex>
      <Button bg="black" w="full" color="white" size="xl">
        خرید کتاب
      </Button>
      <Button variant="outline" w="full" size="xl">
        دانلود نمونه
      </Button>
    </VStack>
  );
}
