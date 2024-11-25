import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const appStore = create<TAppStore>()(
  persist(
    immer<TAppStore>((set) => ({
      locale: "fa",
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
