import { Image, ImageProps } from "@chakra-ui/react";
import { useColorMode } from "../ui/color-mode";
import { useTranslation } from "react-i18next";

type TProps = ImageProps & { mode?: "light" | "dark" };
export default function Logo({ mode = "light", ...rest }: TProps) {
  const { colorMode } = useColorMode();
  mode = mode || colorMode;
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage;

  return (
    <Image
      w="150px"
      h="auto"
      src={`/images/logo-${locale}-${mode}.png`}
      {...rest}
    />
  );
}
