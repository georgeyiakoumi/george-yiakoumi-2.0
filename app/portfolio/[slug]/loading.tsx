import { Section } from "@/components/section";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectLoading() {
  return (
    <Section className="!h-auto !justify-start !items-start pt-32 pb-0 md:pt-16">
      <header className="flex flex-col gap-4 w-full">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full max-w-md" />
        <Skeleton className="h-6 w-full max-w-2xl" />
        <Skeleton className="h-6 w-full max-w-xl" />

        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>

        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-28" />
        </div>

        <Skeleton className="h-64 w-full" />
      </header>

      <article className="flex flex-col w-full gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Section key={i}>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </Section>
        ))}
      </article>
    </Section>
  );
}
