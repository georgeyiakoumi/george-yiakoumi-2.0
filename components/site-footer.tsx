import { AUTHOR } from "@/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed top-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-4 md:top-auto md:right-4 md:bottom-4 lg:bottom-12 lg:right-12 md:left-auto box-border flex flex-col gap-4 items-start lg:items-end z-10 p-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <img
              src="/logo.svg"
              alt={`${AUTHOR.fullName} Logo`}
              className="size-8 md:size-10 dark:invert dark:brightness-0 dark:contrast-100 cursor-default"
            />
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>© {currentYear} {AUTHOR.fullName}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </footer>
  );
}
