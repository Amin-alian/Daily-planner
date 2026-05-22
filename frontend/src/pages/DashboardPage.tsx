import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { useTasks } from '../hooks/useTasks'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import CompletionStats from '../components/dashboard/CompletionStats'
import TaskList from '../components/dashboard/TaskList'
import AddTaskModal from '../components/tasks/AddTaskModal'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useUiStore } from '../store/uiStore'

export default function DashboardPage() {
  const [openAddModal, setOpenAddModal] = useState(false)
  const addToast = useUiStore((state) => state.addToast)
  const {
    todayTasks,
    loading,
    fetchTodayTasks,
    fetchTemplates,
    createTemplate,
    toggleTask,
  } = useTasks()

  useEffect(() => {
    void fetchTodayTasks()
    void fetchTemplates()
  }, [fetchTodayTasks, fetchTemplates])

  const completed = useMemo(
    () => todayTasks.filter((task) => task.status === 'COMPLETED').length,
    [todayTasks],
  )

  const handleAdd = async (payload: { title: string; category: string }) => {
    await createTemplate(payload)
    await fetchTodayTasks()
    addToast({ type: 'success', message: 'Task added successfully' })
  }

  const handleToggle = async (taskId: number) => {
    await toggleTask(taskId)
    await fetchTodayTasks()
  }

  return (
    <DashboardLayout>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Today&apos;s Tasks</h1>
        <button
          type="button"
          onClick={() => setOpenAddModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" /> Quick Add
        </button>
      </div>

      <div className="mb-4">
        <CompletionStats completed={completed} total={todayTasks.length} />
      </div>

      {loading ? <LoadingSpinner /> : <TaskList tasks={todayTasks} onToggle={handleToggle} />}

      <AddTaskModal open={openAddModal} onClose={() => setOpenAddModal(false)} onSubmit={handleAdd} />
    </DashboardLayout>
  )
}
