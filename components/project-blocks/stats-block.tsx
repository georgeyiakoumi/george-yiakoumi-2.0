import { Typography } from "@/components/ui/typography";
import type { StatsBlock as StatsBlockType } from "@/lib/strapi-queries";

interface StatsBlockProps {
  block: StatsBlockType;
}

export function StatsBlock({ block }: StatsBlockProps) {
  if (!block.items || block.items.length === 0) return null;

  // For now, we'll implement the "number-only" chart type
  // Bar/line/pie charts can be added later with Recharts

  return (
    <section className="w-full my-16 px-8">
      <div className="max-w-4xl mx-auto">
        {block.description && (
          <Typography variant="lead" className="text-center mb-12">
            {block.description}
          </Typography>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {block.items.map((item) => (
            <div key={item.id} className="flex flex-col items-center text-center gap-2">
              <Typography variant="h2" className="text-primary">
                {item.value}
                {item.suffix && <span className="text-2xl">{item.suffix}</span>}
              </Typography>
              <Typography variant="large" className="font-semibold">
                {item.label}
              </Typography>
              {(item.context || item.description) && (
                <Typography variant="muted" className="text-sm">
                  {item.context || item.description}
                </Typography>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
