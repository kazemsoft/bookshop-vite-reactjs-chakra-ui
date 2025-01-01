import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router";
import Header from "./_components/header";
import Footer from "./_components/footer";

export default function ShopLayout() {
  return (
    <Box w="full" h="full">
      <Header />
      <Container maxW="container.xl" py={[4, 4, 8]}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}
