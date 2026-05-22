interface CompletionStatsProps {
  completed: number
  total: number
}

export default function CompletionStats({ completed, total }: CompletionStatsProps) {
  const percentage = total ? Math.round((completed / total) * 100) : 0

  return (
    <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-4 text-white shadow-card">
      <p className="text-sm opacity-90">Today's completion</p>
      <p className="mt-1 text-2xl font-bold">{percentage}%</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/30">
        <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${percentage}%` }} />
      </div>
      <p className="mt-2 text-xs opacity-90">{completed} of {total} tasks completed</p>
    </div>
  )
}
