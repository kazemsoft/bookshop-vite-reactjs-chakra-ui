type TAccessToken = null | string;
type TRefreshToken = null | string;
type TIdToken = null | string;
type TSetTokenProps = {
  accessToken: TAccessToken;
  refreshToken: TRefreshToken;
  idToken: TIdToken;
};
type TAppStore = {
  locale: string;
  accessToken: TAccessToken;
  refreshToken: TRefreshToken;
  idToken: TIdToken;
  setTokens: ({ accessToken, refreshToken, idToken }: TSetTokenProps) => void;
  changeLocale: (locale: string) => void;
  logout: () => void;
};
