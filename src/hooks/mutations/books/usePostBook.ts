import restAPI from "@api/index";
import { useMutation } from "@tanstack/react-query";

type TProps = MakeOptional<TBook, "id">;

export function usePostBook() {
  return useMutation({
    mutationFn: async ({
      title,
      description,
      price,
      imageUrl,
      authorId,
    }: TProps): Promise<TBook> => {
      const { data } = await restAPI.post("/books", {
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
