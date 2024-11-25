"use client";

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { ColorModeProvider } from "./color-mode";
import appStore from "@stores/appStore";
import { useStore } from "zustand";
import { useMemo } from "react";

export const Provider = (props: PropsWithChildren) => {
  const locale = useStore(appStore, (state) => state.locale);
  const system = useMemo(
    () =>
      createSystem(defaultConfig, {
        globalCss: {
          body: {
            colorPalette: "blue",
            direction: locale === "fa" ? "rtl" : "ltr",
          },
          "html, body": {
            margin: 0,
            padding: 0,
            height: "full",
            width: "full",
          },
          "#root": {
            height: "full",
            width: "full",
          },
        },
        theme: {
          tokens: {
            fonts: {
              body: { value: "Vazirmatn" },
              heading: { value: "Vazirmatn" },
            },
          },
          semanticTokens: {
            radii: {
              l1: { value: "0.125rem" },
              l2: { value: "0.25rem" },
              l3: { value: "0.375rem" },
            },
          },
        },
      }),
    [locale]
  );

  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>{props.children}</ColorModeProvider>
    </ChakraProvider>
  );
};
