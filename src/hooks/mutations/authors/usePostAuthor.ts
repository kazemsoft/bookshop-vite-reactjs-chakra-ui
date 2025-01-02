import restAPI from "@api/index";
import { useMutation } from "@tanstack/react-query";

type TProps = {
  name: string;
  imageUrl?: string;
};

export function usePostAuthor() {
  return useMutation({
    mutationFn: async ({ name, imageUrl }: TProps): Promise<TAuthor> => {
      const { data } = await restAPI.post("/authors", { name, imageUrl });
      return data;
    },
  });
}
