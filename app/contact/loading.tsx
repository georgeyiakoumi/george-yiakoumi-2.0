import { Section } from "@/components/section";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContactLoading() {
  return (
    <Section>
      <div className="w-full sm:w-lg flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-24 w-full" />
        </div>
        <Skeleton className="h-12 w-40" />
      </div>
    </Section>
  );
}
