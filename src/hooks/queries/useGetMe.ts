import { useQuery } from "@tanstack/react-query";
import { iamRestAPI } from "src/api";
import config from "src/config";

type TMe = {
  sub: string;
  email: string;
  email_verified: boolean;
  kube_sub_email: string;
  groups: string[];
  mobile_phone: string | null;
  mobile_phone_verified: boolean;
  profile: {
    given_name: string | null;
    family_name: string | null;
    national_id: string | null;
    company_name: string | null;
    contact_phone: string | null;
    postal_code: string | null;
    registration_no: string | null;
    economical_code: string | null;
    updated_at: Date;
  };
  tenant: string | null;
};

const { IAM_SCOPES } = config;
export default function useGetMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async function () {
      const { data } = await iamRestAPI.get<TMe>(
        `/oidc/me?scope=${IAM_SCOPES}`
      );
      return data;
    },
  });
}
