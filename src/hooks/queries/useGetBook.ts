import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import restAPI from "src/api";

export default function useGetBook() {
  const bookId = useParams().bookId;
  return useQuery({
    queryKey: ["book", bookId],
    queryFn: async (): Promise<TBook> => {
      const { data } = await restAPI.get(`/books/${bookId}`);
      return data;
    },
  });
}
