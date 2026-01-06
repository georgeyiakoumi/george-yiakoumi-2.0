import { Section } from "@/components/section";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";

export default function PortfolioLoading() {
  return (
    <Section className="!h-auto !justify-start py-32 md:py-16">
      <Skeleton className="h-10 w-48" />

      <div className="w-full grid grid-cols-1 xl:grid-cols-2 xl:auto-rows-fr 2xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="xl:h-full flex flex-col">
            <CardHeader className="flex-1 !flex !flex-col gap-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardFooter className="flex-wrap gap-1">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}
