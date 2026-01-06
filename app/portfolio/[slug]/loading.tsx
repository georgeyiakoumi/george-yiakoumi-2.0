import { Section } from "@/components/section";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectLoading() {
  return (
    <Section className="!h-auto !justify-start !items-start !p-0 relative">
      <Skeleton className="h-10 w-24 fixed top-8 left-8 md:bottom-8 md:top-auto md:left-8 lg:left-16 z-20" />

      <header className="flex flex-col gap-8 px-8 place-items-center justify-center w-full h-screen">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-12 w-full max-w-xl" />
        <Skeleton className="h-6 w-full max-w-xl" />

        <div className="flex flex-wrap gap-2 justify-center">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
      </header>

      <Skeleton className="w-full h-[calc(100vh-17rem)] md:h-[calc(100vh-12rem)]" />

      <article className="flex flex-col w-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <Section key={i}>
            <Skeleton className="h-6 w-32 mx-auto" />
            <Skeleton className="h-4 w-full max-w-2xl" />
            <Skeleton className="h-4 w-full max-w-2xl" />
            <Skeleton className="h-4 w-3/4 max-w-2xl" />
          </Section>
        ))}
      </article>
    </Section>
  );
}
