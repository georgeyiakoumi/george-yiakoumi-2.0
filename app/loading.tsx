import { Section } from "@/components/section";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <>
      {/* Avatar and Bio Section */}
      <Section as="header">
        <Skeleton className="size-32 rounded-full" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-96" />
        <Skeleton className="h-6 w-80" />
      </Section>

      {/* Companies Section */}
      <Section>
        <Skeleton className="h-8 w-80" />
        <div className="w-full grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </Section>

      {/* Tools Section */}
      <Section>
        <Skeleton className="h-8 w-72" />
        <div className="w-full grid gap-8 grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
          {Array.from({ length: 16 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <Skeleton className="h-8 w-96" />
        <Skeleton className="h-6 w-80" />
        <Skeleton className="h-12 w-40" />
      </Section>
    </>
  );
}
