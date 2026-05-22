import { useEffect, useState } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import LoadingSpinner from '../components/common/LoadingSpinner'
import AnalyticsChart from '../components/analytics/AnalyticsChart'
import StatsCards from '../components/analytics/StatsCards'
import { useAnalytics } from '../hooks/useAnalytics'

export default function AnalyticsPage() {
  const { progress, fetchProgress, loading } = useAnalytics()
  const [days, setDays] = useState(7)

  useEffect(() => {
    void fetchProgress(days)
  }, [fetchProgress, days])

  return (
    <DashboardLayout>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <div className="flex items-center gap-2">
          {[7, 30].map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => setDays(period)}
              className={`rounded-xl px-3 py-2 text-sm font-medium ${days === period ? 'bg-primary text-white' : 'border border-gray-300 dark:border-slate-700'}`}
            >
              {period} days
            </button>
          ))}
          <input
            type="number"
            min={1}
            max={365}
            value={days}
            onChange={(event) => setDays(Number(event.target.value || 7))}
            className="w-24 rounded-xl border border-gray-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4">
          <StatsCards progress={progress} />
          <AnalyticsChart progress={progress} />
        </div>
      )}
    </DashboardLayout>
  )
}
