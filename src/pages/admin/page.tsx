import { Center, Container, Grid } from "@chakra-ui/react";
import EntityItem from "./_components/entity-item";
import appStore from "@stores/appStore";

export default function AdminPage() {
  const logout = appStore((state) => state.logout);
  return (
    <Container maxW="container.xl" w="full" h="full">
      <Center
        minH={[
          "calc(100vh - 220px)",
          "calc(100vh - 220px)",
          "calc(100vh - 270px)",
        ]}
        w="full"
      >
        <Grid
          w="full"
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          gap={[4, 4, 8]}
        >
          <EntityItem
            icon="FaUserPen"
            title="مدیریت نویسندگان"
            href="/admin/authors"
          />
          <EntityItem
            icon="FaBook"
            title="مدیریت کتاب‌ها"
            href="/admin/books"
          />
          <EntityItem icon="FaDoorOpen" title="خروج" onClick={() => logout()} />
        </Grid>
      </Center>
    </Container>
  );
}
