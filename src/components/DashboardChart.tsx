"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A multiple line chart"

const chartData = [
  { date: "2025-05-01", dailyVisitor: 186, dailyViewer: 104 },
  { date: "2025-05-02", dailyVisitor: 195, dailyViewer: 110 },
  { date: "2025-05-03", dailyVisitor: 173, dailyViewer: 98 },
  { date: "2025-05-04", dailyVisitor: 201, dailyViewer: 120 },
  { date: "2025-05-05", dailyVisitor: 160, dailyViewer: 87 },
  { date: "2025-05-06", dailyVisitor: 188, dailyViewer: 101 },
  { date: "2025-05-07", dailyVisitor: 175, dailyViewer: 95 },
  { date: "2025-05-08", dailyVisitor: 190, dailyViewer: 103 },
  { date: "2025-05-09", dailyVisitor: 182, dailyViewer: 99 },
  { date: "2025-05-10", dailyVisitor: 200, dailyViewer: 115 },
  { date: "2025-05-11", dailyVisitor: 176, dailyViewer: 93 },
  { date: "2025-05-12", dailyVisitor: 191, dailyViewer: 100 },
  { date: "2025-05-13", dailyVisitor: 185, dailyViewer: 97 },
  { date: "2025-05-14", dailyVisitor: 199, dailyViewer: 110 },
  { date: "2025-05-15", dailyVisitor: 178, dailyViewer: 96 },
  { date: "2025-05-16", dailyVisitor: 192, dailyViewer: 102 },
  { date: "2025-05-17", dailyVisitor: 183, dailyViewer: 95 },
  { date: "2025-05-18", dailyVisitor: 189, dailyViewer: 105 },
  { date: "2025-05-19", dailyVisitor: 170, dailyViewer: 90 },
  { date: "2025-05-20", dailyVisitor: 194, dailyViewer: 108 },
  { date: "2025-05-21", dailyVisitor: 181, dailyViewer: 99 },
  { date: "2025-05-22", dailyVisitor: 196, dailyViewer: 107 },
  { date: "2025-05-23", dailyVisitor: 187, dailyViewer: 98 },
  { date: "2025-05-24", dailyVisitor: 193, dailyViewer: 101 },
  { date: "2025-05-25", dailyVisitor: 179, dailyViewer: 92 },
  { date: "2025-05-26", dailyVisitor: 200, dailyViewer: 114 },
  { date: "2025-05-27", dailyVisitor: 177, dailyViewer: 91 },
  { date: "2025-05-28", dailyVisitor: 198, dailyViewer: 109 },
  { date: "2025-05-29", dailyVisitor: 184, dailyViewer: 97 },
  { date: "2025-05-30", dailyVisitor: 190, dailyViewer: 103 },
  { date: "2025-05-31", dailyVisitor: 202, dailyViewer: 118 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export default function DashboardChart() {
  return (
    <div className="border-0 shadow-none">
      <div>
        <p className="text-[25px]">Monthly Statics</p>
        <p className="text-[14px]">May - June</p>
      </div>
      <ChartContainer config={chartConfig} className="mt-3">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval={6} // Show every 7th tick (0-based index)
            tickFormatter={(value) => {
              // Show only the day part (e.g., "01", "08", "15", ...)
              return value.slice(8, 10);
            }}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="dailyVisitor"
            type="monotone"
            stroke="#FF6A6A"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="dailyViewer"
            type="monotone"
            stroke="#7979FF"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
      <div className="flex w-full items-start gap-2 text-sm mt-3">
        <div className="grid gap-2">
          <div className="flex items-center gap-2 leading-none font-medium">
            <div className="size-3 bg-[#FF6A6A]"/> Daily Visitors
          </div>
          <div className="text-muted-foreground flex items-center gap-2 leading-none">
            <div className="size-3 bg-[#7979FF]"/> Daily Viewers
          </div>
        </div>
      </div>
    </div>
  )
}