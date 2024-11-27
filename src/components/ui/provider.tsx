"use client";

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { ColorModeProvider } from "./color-mode";
import appStore from "@stores/appStore";
import { useStore } from "zustand";
import { useMemo } from "react";
import { breakpoints } from "src/theme/breakpoints";
import { tokens } from "src/theme/tokens";
import { keyframes } from "src/theme/keyframes";
import { semanticTokens } from "src/theme/semantic-tokens";
import { recipes } from "src/theme/recipes";
import { slotRecipes } from "src/theme/slot-recipes";
import { textStyles } from "src/theme/text-styles";
import { layerStyles } from "src/theme/layer-styles";
import { animationStyles } from "src/theme/animation-styles";

export const Provider = (props: PropsWithChildren) => {
  const locale = useStore(appStore, (state) => state.locale);
  const system = useMemo(
    () =>
      createSystem(defaultConfig, {
        globalCss: {
          "*": {
            fontFeatureSettings: '"cv11"',
            "--ring-inset": "var(--chakra-empty,/*!*/ /*!*/)",
            "--ring-offset-width": "0px",
            "--ring-offset-color": "#fff",
            "--ring-color": "rgba(66, 153, 225, 0.6)",
            "--ring-offset-shadow": "0 0 #0000",
            "--ring-shadow": "0 0 #0000",
            "--brightness": "var(--chakra-empty,/*!*/ /*!*/)",
            "--contrast": "var(--chakra-empty,/*!*/ /*!*/)",
            "--grayscale": "var(--chakra-empty,/*!*/ /*!*/)",
            "--hue-rotate": "var(--chakra-empty,/*!*/ /*!*/)",
            "--invert": "var(--chakra-empty,/*!*/ /*!*/)",
            "--saturate": "var(--chakra-empty,/*!*/ /*!*/)",
            "--sepia": "var(--chakra-empty,/*!*/ /*!*/)",
            "--drop-shadow": "var(--chakra-empty,/*!*/ /*!*/)",
            "--backdrop-blur": "var(--chakra-empty,/*!*/ /*!*/)",
            "--backdrop-brightness": "var(--chakra-empty,/*!*/ /*!*/)",
            "--backdrop-contrast": "var(--chakra-empty,/*!*/ /*!*/)",
            "--backdrop-grayscale": "var(--chakra-empty,/*!*/ /*!*/)",
            "--backdrop-hue-rotate": "var(--chakra-empty,/*!*/ /*!*/)",
            "--backdrop-invert": "var(--chakra-empty,/*!*/ /*!*/)",
            "--backdrop-opacity": "var(--chakra-empty,/*!*/ /*!*/)",
            "--backdrop-saturate": "var(--chakra-empty,/*!*/ /*!*/)",
            "--backdrop-sepia": "var(--chakra-empty,/*!*/ /*!*/)",
            "--global-font-mono": "fonts.mono",
            "--global-font-body": "fonts.body",
            "--global-color-border": "colors.border",
          },
          html: {
            color: "fg",
            bg: "bg",
            lineHeight: "1.5",
            colorPalette: "gray",
          },
          "*::placeholder": {
            color: "fg.muted/80",
          },
          "*::selection": {
            bg: "colorPalette.muted/80",
          },
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
        preflight: true,
        cssVarsPrefix: "chakra",
        cssVarsRoot: ":where(:root, :host)",
        theme: {
          breakpoints,
          keyframes,
          tokens,
          semanticTokens,
          recipes,
          slotRecipes,
          textStyles,
          layerStyles,
          animationStyles,
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
