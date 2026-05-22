import { useTaskStore } from '../store/taskStore'

export const useAnalytics = () => {
  const progress = useTaskStore((state) => state.progress)
  const fetchProgress = useTaskStore((state) => state.fetchProgress)
  const loading = useTaskStore((state) => state.loading)
  const error = useTaskStore((state) => state.error)

  return { progress, fetchProgress, loading, error }
}
