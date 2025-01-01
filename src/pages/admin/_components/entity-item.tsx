/* eslint-disable @typescript-eslint/no-explicit-any */
import { Center, Icon, Text, VStack } from "@chakra-ui/react";
import ReactIcons from "@components/react-icons/react-icons";
import { Link } from "react-router";

type TProps = {
  title: string;
  icon: string;
  href?: string;
  onClick?: () => void;
};

export default function EntityItem({ title, icon, href, onClick }: TProps) {
  const content = (
    <Center
      w="full"
      h="full"
      boxShadow="md"
      borderRadius="md"
      p="4"
      onClick={onClick}
      cursor="pointer"
    >
      <VStack w="full" h="full" p={4} gap={4}>
        <Icon size="2xl">
          <ReactIcons iconName={icon} />
        </Icon>
        <Text>{title}</Text>
      </VStack>
    </Center>
  );

  return onClick ? content : <Link to={href || "#"}>{content}</Link>;
}
