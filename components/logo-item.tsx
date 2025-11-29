import { Item, ItemMedia } from "@/components/ui/item";
import { cn } from "@/lib/utils";

interface LogoItemProps {
  name: string;
  logo: string;
  ariaLabel: string;
  className?: string;
}

export function LogoItem({ name, logo, ariaLabel, className }: LogoItemProps) {
  return (
    <Item
      variant="outline"
      className="size-full justify-center aspect-square"
      aria-label={ariaLabel}
    >
      <ItemMedia className={cn(className)}>{logo}</ItemMedia>
    </Item>
  );
}
