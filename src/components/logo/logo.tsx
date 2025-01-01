// biome-ignore lint/style/useImportType: <explanation>
import { Image, ImageProps } from "@chakra-ui/react";
import { useColorMode } from "@components/ui/color-mode";
import { Link } from "react-router";

type TProps = ImageProps;
export default function Logo({ ...rest }: TProps) {
  const { colorMode } = useColorMode();
  return (
    <Link to="/">
      <Image
        w="90px"
        h="auto"
        src={`/images/logo_${colorMode}.svg`}
        {...rest}
      />
    </Link>
  );
}
