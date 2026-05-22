import type { ProgressData } from '../../types'

export default function AnalyticsChart({ progress }: { progress: ProgressData | null }) {
  const percentage = Math.round(progress?.completionPercentage ?? 0)

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm text-gray-500">Completion progress ({progress?.period ?? 'N/A'})</p>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-800">
        <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500" style={{ width: `${percentage}%` }} />
      </div>
      <p className="mt-3 text-sm font-semibold">{percentage}% completion</p>
      <div className="mt-4 grid grid-cols-10 gap-1">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={`segment-${index + 1}`}
            className={`h-5 rounded ${index < Math.round(percentage / 10) ? 'bg-primary' : 'bg-gray-200 dark:bg-slate-800'}`}
          />
        ))}
      </div>
    </div>
  )
}
