import restAPI from "@api/index";
import { useMutation } from "@tanstack/react-query";

type TProps = {
  id: number;
  name: string;
  imageUrl?: string;
};

export function usePutAuthor() {
  return useMutation({
    mutationFn: async ({ name, imageUrl, id }: TProps): Promise<TAuthor> => {
      const { data } = await restAPI.put(`/authors/${id}`, {
        name,
        imageUrl,
      });
      return data;
    },
  });
}
