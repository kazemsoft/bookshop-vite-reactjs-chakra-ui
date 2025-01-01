import { useQuery } from "@tanstack/react-query";
import restAPI from "src/api";

export default function useGetBooks() {
  return useQuery({
    queryKey: ["books"],
    queryFn: async (): Promise<TBook[]> => {
      const { data } = await restAPI.get("/books");
      return data;
    },
  });
}
