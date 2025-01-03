import restAPI from "@api/index";
import { useMutation } from "@tanstack/react-query";

export function useDeleteBook() {
  return useMutation({
    mutationFn: async ({ bookId }: { bookId: number }) => {
      return await restAPI.delete(`/books/${bookId}`);
    },
  });
}
