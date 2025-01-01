import * as FaIcons from "react-icons/fa6";
import type { IconBaseProps, IconType } from "react-icons";

type TProps = IconBaseProps & {
  iconName: string;
};

export default function ReactIcons({ iconName, ...rest }: TProps) {
  const IconComponent: IconType | undefined = (
    FaIcons as Record<string, IconType>
  )[iconName];
  return IconComponent ? <IconComponent {...rest} /> : null;
}
