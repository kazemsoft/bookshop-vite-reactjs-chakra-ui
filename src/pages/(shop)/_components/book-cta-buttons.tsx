import { HStack, IconButton } from "@chakra-ui/react";
import { FaShareAlt } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";

export default function BookCTAButtons() {
  return (
    <HStack justify="flex-end" alignItems="flex-end" h="full" gap={2}>
      <IconButton variant="ghost" aria-label="اشتراک گذاری">
        <FaShareAlt />
      </IconButton>
      <IconButton variant="ghost" aria-label="ذخیره">
        <FaRegBookmark />
      </IconButton>
    </HStack>
  );
}
