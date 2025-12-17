"use client"

import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// SDR weekly targets
const TARGETS = {
  emails: 40,
  calls: 500,
  leads: 50,
  linkedin: 20,
}

// Sample data for the current week's progress
const sdrProgress = [
  { category: "Emails", value: 35, target: TARGETS.emails, fullMark: TARGETS.emails },
  { category: "Calls", value: 400, target: TARGETS.calls, fullMark: TARGETS.calls },
  { category: "Leads", value: 45, target: TARGETS.leads, fullMark: TARGETS.leads },
  { category: "LinkedIn", value: 15, target: TARGETS.linkedin, fullMark: TARGETS.linkedin },
]

// Normalized data for better visualization (percentage of target)
const normalizedData = sdrProgress.map((item) => ({
  category: item.category,
  progress: Math.round((item.value / item.target) * 100),
  target: 100, // Target is always 100%
}))

export function SDRPerformanceChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Weekly SDR Performance</CardTitle>
        <CardDescription>
          Progress toward weekly targets: {TARGETS.emails} emails, {TARGETS.calls} calls, {TARGETS.leads} leads,{" "}
          {TARGETS.linkedin} LinkedIn outreaches
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[450px]">
          <ChartContainer
            config={{
              progress: {
                label: "Current Progress",
                color: "hsl(var(--chart-1))",
              },
              target: {
                label: "Target (100%)",
                color: "hsl(var(--chart-2))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={normalizedData} margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Radar
                  name="Target"
                  dataKey="target"
                  stroke="var(--color-target)"
                  fill="var(--color-target)"
                  fillOpacity={0.1}
                />
                <Radar
                  name="Progress"
                  dataKey="progress"
                  stroke="var(--color-progress)"
                  fill="var(--color-progress)"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {sdrProgress.map((item) => (
            <div key={item.category} className="flex flex-col items-center p-3 border rounded-lg">
              <div className="text-lg font-semibold">{item.category}</div>
              <div className="text-3xl font-bold">{item.value}</div>
              <div className="text-sm text-muted-foreground">
                of {item.target} ({Math.round((item.value / item.target) * 100)}%)
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
