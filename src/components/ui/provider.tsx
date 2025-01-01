"use client";

import { ChakraProvider } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { ColorModeProvider } from "./color-mode";
import { system } from "src/theme";

export const Provider = (props: PropsWithChildren) => {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>{props.children}</ColorModeProvider>
    </ChakraProvider>
  );
};
