import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "header" | "footer" | "article" | "aside" | "nav";
}

export function Section({ children, className, as = "section" }: SectionProps) {
  const Tag = as;

  return (
    <Tag className={cn("gap-8 md:max-w-md lg:max-w-xl xl:max-w-4xl 2xl:max-w-6xl min-h-dvh flex flex-col mx-auto items-center justify-center px-8 md:px-0 py-32", className)}>
      {children}
    </Tag>
  );
}