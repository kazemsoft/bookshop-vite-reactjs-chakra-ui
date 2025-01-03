import { Card, Image, Text } from "@chakra-ui/react";
import { formatPrice } from "@utils/numbers";
import { Link } from "react-router";

type TProps = {
  book: TBook;
};

export default function BookCard({ book }: TProps) {
  return (
    <Link to={`/book/${book.id}`}>
      <Card.Root h={"350px"} overflowY="hidden">
        <Card.Body gap={4} alignItems="center">
          <Image
            w="120px"
            h="auto"
            src={book.imageUrl || "/images/default-image.svg"}
            alt={book.title}
            borderRadius="md"
            boxShadow="md"
          />
          <Card.Title fontSize="sm" textAlign="center">
            {book.title}
          </Card.Title>
          <Text fontWeight={900}>{formatPrice(Number(book.price))} تومان</Text>
        </Card.Body>
      </Card.Root>
    </Link>
  );
}
