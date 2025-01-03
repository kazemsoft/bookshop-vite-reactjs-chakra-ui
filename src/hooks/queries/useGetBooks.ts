import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import restAPI from "src/api";

export default function useGetBooks() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  return useQuery({
    queryKey: ["books", q],
    queryFn: async (): Promise<TBook[]> => {
      const { data } = await restAPI.get("/books/search", {
        params: { q: q || "" },
      });
      return data;
    },
  });
}
