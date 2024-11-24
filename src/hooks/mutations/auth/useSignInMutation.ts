import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import config from "src/config";

interface Login {
  email: string;
  password: string;
}

type TResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  id_token: string;
  token_type: string;
};

export function useSignInMutation() {
  const { IAM_URL, IAM_CLIENT_ID, IAM_SCOPES } = config;
  return useMutation({
    mutationFn: async ({ email, password }: Login): Promise<TResponse> => {
      const obj = {
        username: email,
        password,
        client_id: IAM_CLIENT_ID,
        grant_type: "password",
        scope: IAM_SCOPES,
      };
      const { data } = await axios.post(`${IAM_URL}/oidc/token`, obj, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return data;
    },
  });
}
