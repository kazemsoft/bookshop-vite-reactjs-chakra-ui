import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import restAPI from "src/api";

export default function useGetAuthor() {
  const { authorId } = useParams();

  return useQuery({
    queryKey: ["author", authorId],
    queryFn: async (): Promise<TAuthor> => {
      const { data } = await restAPI.get(`/authors/${authorId}`);
      return data;
    },
  });
}
