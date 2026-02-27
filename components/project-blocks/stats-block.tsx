"use client";

import { Typography } from "@/components/ui/typography";
import type { StatsBlock as StatsBlockType } from "@/lib/strapi-queries";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface StatsBlockProps {
  block: StatsBlockType;
}

export function StatsBlock({ block }: StatsBlockProps) {
  if (!block.items || block.items.length === 0) return null;

  const chartType = block.chart_type || 'number-only';
  const suffix = block.items?.[0]?.suffix || '';

  // Get the appropriate variant based on chart type
  const variant = (block[`${chartType}_variant` as keyof StatsBlockType] as string) || 'default';

  // Feature toggles with defaults
  const showLegend = block.show_legend !== false;
  const showGrid = block.show_grid !== false;
  const showAxes = block.show_axes !== false;
  const showDots = block.show_dots === true;
  const showLabels = block.show_labels === true;

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

  // Prepare data for time-series charts (Area, Bar, Line)
  const chartData = block.items.map((item) => ({
    name: item.label,
    value: typeof item.value === 'string' ? parseFloat(item.value) : item.value,
    fullLabel: item.label,
  }));

  // Chart configuration
  const chartConfig = {
    value: {
      label: suffix || "Value",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  // ========== AREA CHARTS ==========
  if (chartType === 'area') {
    const areaType = variant === 'linear' ? 'linear' : variant === 'step' ? 'step' : 'natural';
    const isStacked = variant === 'stacked';
    const isGradient = variant === 'gradient';

    return (
      <section className="w-full my-16 px-8">
        <div className="max-w-4xl mx-auto">
          {block.description && (
            <Typography variant="lead" className="text-center mb-12">
              {block.description}
            </Typography>
          )}

          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <AreaChart data={chartData}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
              {showAxes && <XAxis dataKey="name" />}
              {showAxes && <YAxis />}
              <ChartTooltip content={<ChartTooltipContent />} />
              {showLegend && <ChartLegend content={<ChartLegendContent />} />}
              <defs>
                <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-value)" stopOpacity={isGradient ? 0.1 : 0.3} />
                </linearGradient>
              </defs>
              <Area
                dataKey="value"
                type={areaType}
                fill="url(#fillValue)"
                fillOpacity={1}
                stroke="var(--color-value)"
                strokeWidth={2}
                stackId={isStacked ? "a" : undefined}
                dot={showDots}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </section>
    );
  }

  // ========== BAR CHARTS ==========
  if (chartType === 'bar') {
    const isHorizontal = variant === 'horizontal';

    return (
      <section className="w-full my-16 px-8">
        <div className="max-w-4xl mx-auto">
          {block.description && (
            <Typography variant="lead" className="text-center mb-12">
              {block.description}
            </Typography>
          )}

          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <BarChart
              data={chartData}
              layout={isHorizontal ? "vertical" : "horizontal"}
            >
              {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={!isHorizontal} />}
              {isHorizontal ? (
                <>
                  {showAxes && <XAxis type="number" />}
                  {showAxes && <YAxis dataKey="name" type="category" />}
                </>
              ) : (
                <>
                  {showAxes && <XAxis dataKey="name" />}
                  {showAxes && <YAxis />}
                </>
              )}
              <ChartTooltip content={<ChartTooltipContent />} />
              {showLegend && <ChartLegend content={<ChartLegendContent />} />}
              <Bar
                dataKey="value"
                fill="var(--color-value)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </section>
    );
  }

  // ========== LINE CHARTS ==========
  if (chartType === 'line') {
    const lineType = variant === 'linear' ? 'linear' : variant === 'step' ? 'step' : 'natural';
    const showLineDots = variant === 'dots' || showDots;

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
              {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
              {showAxes && <XAxis dataKey="name" />}
              {showAxes && <YAxis />}
              <ChartTooltip content={<ChartTooltipContent />} />
              {showLegend && <ChartLegend content={<ChartLegendContent />} />}
              <Line
                type={lineType}
                dataKey="value"
                stroke="var(--color-value)"
                strokeWidth={2}
                dot={showLineDots}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </section>
    );
  }

  // ========== PIE CHARTS ==========
  if (chartType === 'pie') {
    const isDonut = variant === 'donut' || variant === 'donut-text' || variant === 'donut-active';

    // Create a color config for each pie slice
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
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              {showLegend && <ChartLegend content={<ChartLegendContent />} />}
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={showLabels ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%` : false}
                outerRadius={120}
                innerRadius={isDonut ? 60 : 0}
                dataKey="value"
                nameKey="name"
              >
                {chartData.map((item, index) => (
                  <Cell key={`cell-${index}`} fill={`var(--color-${item.name})`} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </section>
    );
  }

  // ========== RADAR CHARTS ==========
  if (chartType === 'radar') {
    const showRadarDots = variant === 'dots' || showDots;
    const linesOnly = variant === 'lines-only';
    const isCircle = variant === 'circle';
    const isFilled = variant === 'filled';

    return (
      <section className="w-full my-16 px-8">
        <div className="max-w-4xl mx-auto">
          {block.description && (
            <Typography variant="lead" className="text-center mb-12">
              {block.description}
            </Typography>
          )}

          <ChartContainer config={chartConfig} className="h-[400px] w-full mx-auto aspect-square max-h-[400px]">
            <RadarChart data={chartData}>
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
              {showLegend && <ChartLegend content={<ChartLegendContent />} />}
              <PolarAngleAxis dataKey="name" />
              {showGrid && <PolarGrid gridType={isCircle ? "circle" : "polygon"} />}
              <Radar
                dataKey="value"
                fill="var(--color-value)"
                fillOpacity={isFilled ? 0.6 : linesOnly ? 0 : 0.3}
                stroke="var(--color-value)"
                strokeWidth={2}
                dot={showRadarDots}
              />
            </RadarChart>
          </ChartContainer>
        </div>
      </section>
    );
  }

  // ========== RADIAL CHARTS ==========
  if (chartType === 'radial') {
    const isStacked = variant === 'stacked';
    const showText = variant === 'text';

    // For radial charts, create a color config for each item
    const radialChartConfig = chartData.reduce((config, item, index) => {
      return {
        ...config,
        [item.name]: {
          label: item.name,
          color: `var(--chart-${(index % 5) + 1})`,
        },
      };
    }, {} as ChartConfig);

    // Transform data for radial chart
    const radialData = chartData.map((item, index) => ({
      ...item,
      fill: `var(--chart-${(index % 5) + 1})`,
    }));

    return (
      <section className="w-full my-16 px-8">
        <div className="max-w-4xl mx-auto">
          {block.description && (
            <Typography variant="lead" className="text-center mb-12">
              {block.description}
            </Typography>
          )}

          <ChartContainer config={radialChartConfig} className="h-[400px] w-full mx-auto aspect-square max-h-[400px]">
            <RadialBarChart
              data={radialData}
              startAngle={-90}
              endAngle={380}
              innerRadius={30}
              outerRadius={140}
            >
              <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="name" />} cursor={false} />
              {showLegend && <ChartLegend content={<ChartLegendContent />} />}
              <RadialBar
                dataKey="value"
                background
                stackId={isStacked ? "a" : undefined}
                label={showLabels || showText ? { position: 'insideStart', fill: '#fff' } : undefined}
              />
            </RadialBarChart>
          </ChartContainer>
        </div>
      </section>
    );
  }

  return null;
}
