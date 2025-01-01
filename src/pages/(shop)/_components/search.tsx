import { Input } from "@chakra-ui/react";
import { InputGroup } from "@components/ui/input-group";
import { FaSearch } from "react-icons/fa";

export default function SearchBox() {
  return (
    <InputGroup startElement={<FaSearch />} w="full">
      <Input placeholder="جستجو کتاب ..." w="full" variant="subtle" size="xl" />
    </InputGroup>
  );
}
