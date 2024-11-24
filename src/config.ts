const config = {
  PUBLIC_URL: import.meta.env.VITE_PUBLIC_URL as string,
  IAM_URL: import.meta.env.VITE_IAM_REST_ENDPOINT as string,
  IAM_SCOPES: import.meta.env.VITE_IAM_SCOPES as string,
  IAM_RECAPTCHA: import.meta.env.IAM_RECAPTCHA_SITE_KEY as string,
  GLOBAL_URL: import.meta.env.VITE_GLOBAL_CLUSTER_REST_ENDPOINT as string,
  IAM_CLIENT_ID: import.meta.env.VITE_IAM_CLIENT_ID as string,
  PRICE_SERVICE: import.meta.env.VITE_PRICE_SERVICE as string,
  WALLET_SERVICE: import.meta.env.VITE_WALLET_SERVICE as string,
  SUPPORT_SERVICE: import.meta.env.VITE_SUPPORT_SERVICE as string,
  BOOKKEEPER_SERVICE: import.meta.env.VITE_VITE_BOOKKEEPER_SERVICE as string,
  REGION_ZONES_SERVICE: import.meta.env.VITE_REGION_ZONES_SERVICE as string,
};

export default config;
