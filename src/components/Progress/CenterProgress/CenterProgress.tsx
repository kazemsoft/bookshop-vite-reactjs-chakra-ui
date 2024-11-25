import { Center } from "@chakra-ui/react";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@components/ui/progress-circle";

export default function CenterProgress() {
  return (
    <Center w="full" h="full">
      <ProgressCircleRoot value={null} size="sm">
        <ProgressCircleRing cap="round" />
      </ProgressCircleRoot>
    </Center>
  );
}
