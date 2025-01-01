import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";
import restAPI from "src/api";

export default function useGetAuthors() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  return useQuery({
    queryKey: ["authors"],
    queryFn: async (): Promise<TAuthor[]> => {
      const { data } = await restAPI.get("/authors/search", {
        params: query ? { q: query } : { q: "" },
      });
      return data;
    },
  });
}
