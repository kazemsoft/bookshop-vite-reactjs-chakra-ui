import { Center } from "@chakra-ui/react";
import type { CenterProps } from "@chakra-ui/react";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@components/ui/progress-circle";

type TProps = CenterProps;

export default function CenterProgress({ ...rest }: TProps) {
  return (
    <Center w="full" h="full" {...rest}>
      <ProgressCircleRoot value={null} size="sm">
        <ProgressCircleRing cap="round" />
      </ProgressCircleRoot>
    </Center>
  );
}
