import type { ProgressData } from '../../types'

export default function StatsCards({ progress }: { progress: ProgressData | null }) {
  const stats = [
    { label: 'Completed', value: progress?.totalCompleted ?? 0 },
    { label: 'Expected', value: progress?.totalExpected ?? 0 },
    { label: 'Rate', value: `${Math.round(progress?.completionPercentage ?? 0)}%` },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-gray-500">{stat.label}</p>
          <p className="mt-1 text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
