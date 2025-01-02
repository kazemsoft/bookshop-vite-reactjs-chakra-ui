import restAPI from "@api/index";
import { useMutation } from "@tanstack/react-query";

export function useDeleteAuthor() {
  return useMutation({
    mutationFn: async ({ authorId }: { authorId: number }) => {
      return await restAPI.delete(`/authors/${authorId}`);
    },
  });
}
