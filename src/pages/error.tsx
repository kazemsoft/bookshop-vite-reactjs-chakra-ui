import { EmptyState } from "../components/ui/empty-state";
import { BiSolidError } from "react-icons/bi";
import { Center, Icon } from "@chakra-ui/react";
import { useRouteError } from "react-router";

type TErrorProps = {
  statusText: string;
  message: string;
};

export default function ErrorPage() {
  const error = useRouteError() as TErrorProps;
  return (
    <Center w="full" h="full">
      <EmptyState
        icon={
          <Icon color="red" fontSize="6xl">
            <BiSolidError />
          </Icon>
        }
        title={`Error: ${error.statusText}`}
        description={error.message}
      />
    </Center>
  );
}
