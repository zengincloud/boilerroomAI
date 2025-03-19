import { SDRPerformanceChart } from "@/components/sdr-performance-chart"
import { TaskBoard } from "@/components/task-board"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <SDRPerformanceChart />
      </div>
      <TaskBoard />
    </div>
  )
}

