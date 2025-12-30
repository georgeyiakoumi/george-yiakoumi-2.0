import { Item, ItemMedia } from "@/components/ui/item";
import { cn } from "@/lib/utils";

interface LogoItemProps {
  logo: string;
  ariaLabel: string;
  className?: string;
}

export function LogoItem({ logo, ariaLabel, className }: LogoItemProps) {
  return (
    <Item
      variant="outline"
      className="size-full justify-center aspect-square"
      role="img"
      aria-label={ariaLabel}
    >
      <ItemMedia className={cn(className)}>{logo}</ItemMedia>
    </Item>
  );
}
