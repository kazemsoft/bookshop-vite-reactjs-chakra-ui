import { Button } from "@components/ui/button";
import { IoLibraryOutline } from "react-icons/io5";
import { GrUser } from "react-icons/gr";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { HStack, IconButton } from "@chakra-ui/react";
import { ColorModeButton } from "@components/ui/color-mode";
import { Link } from "react-router";

export default function CTA() {
  return (
    <HStack gap={4}>
      <Button size="xl" variant="subtle" display={["none", "none", "flex"]}>
        <IoLibraryOutline />
        کتابخانه من
      </Button>
      <Link to="/admin">
        <IconButton
          variant="subtle"
          aria-label="ورود"
          size="xl"
          display={["none", "none", "flex"]}
        >
          <GrUser />
        </IconButton>
      </Link>
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
