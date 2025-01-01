import restAPI from "@api/index";
import { useMutation } from "@tanstack/react-query";

type TLogin = {
  identifier: string;
  password: string;
};

type TResponse = {
  message: string;
  token: string;
};

export function usePostLogin() {
  return useMutation({
    mutationFn: async ({
      identifier,
      password,
    }: TLogin): Promise<TResponse> => {
      const { data } = await restAPI.post("/auth/login", {
        identifier,
        password,
      });
      return data;
    },
  });
}
