import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import restAPI from "src/api";

export default function useGetAuthors() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  return useQuery({
    queryKey: ["authors", q],
    queryFn: async (): Promise<TAuthor[]> => {
      const { data } = await restAPI.get("/authors/search", {
        params: { q: q || "" },
      });
      return data;
    },
  });
}
