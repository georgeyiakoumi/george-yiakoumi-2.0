"use client";

import { Typography } from "@/components/ui/typography";
import type { StatsBlock as StatsBlockType } from "@/lib/strapi-queries";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart";

interface StatsBlockProps {
  block: StatsBlockType;
}

export function StatsBlock({ block }: StatsBlockProps) {
  if (!block.items || block.items.length === 0) return null;

  const chartType = block.chart_type || 'number-only';

  // Get suffix from first item (assuming all items have the same suffix for bar/line charts)
  const suffix = block.items?.[0]?.suffix || '';

  // Chart configuration with theme-aware colors
  const chartConfig = {
    value: {
      label: suffix || "Value",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  // Render number-only stats
  if (chartType === 'number-only') {
    return (
      <figure className="flex flex-col gap-4 items-center w-full my-8">
        <div className="w-full max-w-3xl md:max-w-md lg:max-w-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {block.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center gap-2 p-8 border border-border rounded-lg bg-muted/30"
              >
                <Typography variant="h2" className="text-primary">
                  {item.value}
                  {item.suffix && <span className="text-xl">{item.suffix}</span>}
                </Typography>
                <Typography variant="large" className="font-semibold">
                  {item.label}
                </Typography>
                {(item.context || item.description) && (
                  <Typography variant="muted" className="text-sm text-center">
                    {item.context || item.description}
                  </Typography>
                )}
              </div>
            ))}
          </div>
        </div>
        {block.description && (
          <Typography variant="muted" className="text-center px-8 max-w-2xl">
            {block.description}
          </Typography>
        )}
      </figure>
    );
  }

  // Prepare data for charts
  const chartData = block.items.map((item) => ({
    name: item.label,
    value: typeof item.value === 'string' ? parseFloat(item.value) : item.value,
    fullLabel: item.label,
  }));

  // Render bar chart
  if (chartType === 'bar') {
    return (
      <section className="w-full my-16 px-8">
        <div className="max-w-4xl mx-auto">
          {block.description && (
            <Typography variant="lead" className="text-center mb-12">
              {block.description}
            </Typography>
          )}

          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="value" fill="var(--color-value)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </section>
    );
  }

  // Render line chart
  if (chartType === 'line') {
    return (
      <section className="w-full my-16 px-8">
        <div className="max-w-4xl mx-auto">
          {block.description && (
            <Typography variant="lead" className="text-center mb-12">
              {block.description}
            </Typography>
          )}

          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </div>
      </section>
    );
  }

  // Render pie chart
  if (chartType === 'pie') {
    // Create a color config for each pie slice using chart CSS variables
    const pieChartConfig = chartData.reduce((config, item, index) => {
      return {
        ...config,
        [item.name]: {
          label: item.name,
          color: `var(--chart-${(index % 5) + 1})`,
        },
      };
    }, {} as ChartConfig);

    return (
      <section className="w-full my-16 px-8">
        <div className="max-w-4xl mx-auto">
          {block.description && (
            <Typography variant="lead" className="text-center mb-12">
              {block.description}
            </Typography>
          )}

          <ChartContainer config={pieChartConfig} className="h-[400px] w-full">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                dataKey="value"
              >
                {chartData.map((item, index) => (
                  <Cell key={`cell-${index}`} fill={`var(--color-${item.name})`} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        </div>
      </section>
    );
  }

  return null;
}
