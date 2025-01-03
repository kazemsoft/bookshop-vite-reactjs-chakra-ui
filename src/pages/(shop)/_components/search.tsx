import { Input } from "@chakra-ui/react";
import { InputGroup } from "@components/ui/input-group";
import { useDebounce } from "@hooks/useDebounce";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router";

export default function SearchBox() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const [search, setSearch] = useState(q || "");
  const navigate = useNavigate();

  const searchAfterSeconds = useDebounce(search, 500);

  useEffect(() => {
    searchParams.set("q", searchAfterSeconds);
    navigate({ search: searchParams.toString() });
  }, [searchAfterSeconds, navigate, searchParams]);

  return (
    <InputGroup startElement={<FaSearch />} w="full">
      <Input
        placeholder="جستجو کتاب ..."
        w="full"
        variant="subtle"
        size="xl"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </InputGroup>
  );
}
