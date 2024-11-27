import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const appStore = create<TAppStore>()(
  persist(
    immer<TAppStore>((set) => ({
      locale: "fa",
      accessToken: null,
      refreshToken: null,
      idToken: null,
      setTokens: ({ accessToken, refreshToken, idToken }) =>
        set((state) => {
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
          state.idToken = idToken;
        }),
      logout: () =>
        set((state) => {
          state.accessToken = null;
          state.refreshToken = null;
          state.idToken = null;
        }),
      changeLocale: (locale) => {
        set((state) => {
          state.locale = locale;
        });
      },
    })),
    {
      name: "@novin_admin-app",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default appStore;
