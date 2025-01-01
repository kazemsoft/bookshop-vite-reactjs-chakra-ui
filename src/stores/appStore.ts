import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const appStore = create<TAppStore>()(
  persist(
    immer<TAppStore>((set) => ({
      token: "",
      setTokens: (token) =>
        set((state) => {
          state.token = token;
        }),
      logout: () =>
        set((state) => {
          state.token = "";
        }),
    })),
    {
      name: "@bookshop",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default appStore;
