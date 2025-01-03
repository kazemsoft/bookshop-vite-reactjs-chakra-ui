import restAPI from "@api/index";
import { useMutation } from "@tanstack/react-query";

type TProps = MakeOptional<TBook, "id">;

export function usePutBook() {
  return useMutation({
    mutationFn: async ({
      id,
      title,
      description,
      price,
      imageUrl,
      authorId,
    }: TProps): Promise<TBook> => {
      const { data } = await restAPI.put(`/books/${id}`, {
        id,
        title,
        description,
        price,
        imageUrl,
        authorId,
      });
      return data;
    },
  });
}
