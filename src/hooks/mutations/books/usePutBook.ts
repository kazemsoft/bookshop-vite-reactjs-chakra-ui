import restAPI from "@api/index";
import { useMutation } from "@tanstack/react-query";

type TProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string | null;
  authorId: number;
};

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
