import { Button } from "@components/ui/button";
import { IoLibraryOutline } from "react-icons/io5";
import { GrUser } from "react-icons/gr";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { HStack, IconButton } from "@chakra-ui/react";
import { ColorModeButton } from "@components/ui/color-mode";

export default function CTA() {
  return (
    <HStack gap={4}>
      <Button size="xl" variant="subtle" display={["none", "none", "flex"]}>
        <IoLibraryOutline />
        کتابخانه من
      </Button>
      <IconButton
        variant="subtle"
        aria-label="ورود"
        size="xl"
        display={["none", "none", "flex"]}
      >
        <GrUser />
      </IconButton>
      <IconButton
        variant="subtle"
        aria-label="ورود"
        size="xl"
        display={["none", "none", "flex"]}
      >
        <PiShoppingCartSimpleBold />
      </IconButton>
      <ColorModeButton variant="subtle" size="xl" />
    </HStack>
  );
}
