import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import TaskTemplateList from '../components/tasks/TaskTemplateList'
import AddTaskModal from '../components/tasks/AddTaskModal'
import EditTaskModal from '../components/tasks/EditTaskModal'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useTasks } from '../hooks/useTasks'
import type { TaskTemplate } from '../types'
import { useUiStore } from '../store/uiStore'

export default function TasksPage() {
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [editingTask, setEditingTask] = useState<TaskTemplate | null>(null)
  const [categoryFilter, setCategoryFilter] = useState('All')

  const { templates, loading, fetchTemplates, createTemplate, updateTemplate, deleteTemplate } = useTasks()
  const addToast = useUiStore((state) => state.addToast)

  useEffect(() => {
    void fetchTemplates()
  }, [fetchTemplates])

  const categories = useMemo(
    () => ['All', ...new Set(templates.map((task) => task.category || 'General'))],
    [templates],
  )

  const filteredTasks = useMemo(
    () =>
      categoryFilter === 'All'
        ? templates
        : templates.filter((task) => (task.category || 'General') === categoryFilter),
    [templates, categoryFilter],
  )

  const handleCreate = async (payload: { title: string; category: string }) => {
    await createTemplate(payload)
    await fetchTemplates()
    addToast({ type: 'success', message: 'Task template created' })
  }

  const handleUpdate = async (id: number, payload: { title: string; category: string }) => {
    await updateTemplate(id, payload)
    await fetchTemplates()
    addToast({ type: 'success', message: 'Task template updated' })
  }

  const handleDelete = async (task: TaskTemplate) => {
    const confirmed = window.confirm(`Delete "${task.title}"?`)
    if (!confirmed) return
    await deleteTemplate(task.id)
    await fetchTemplates()
    addToast({ type: 'info', message: 'Task template deleted' })
  }

  return (
    <DashboardLayout>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">Task Templates</h1>
        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-xl border border-gray-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setOpenAddModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" /> Add Template
          </button>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <TaskTemplateList
          tasks={filteredTasks}
          onEdit={(task) => {
            setEditingTask(task)
            setOpenEditModal(true)
          }}
          onDelete={handleDelete}
        />
      )}

      <AddTaskModal open={openAddModal} onClose={() => setOpenAddModal(false)} onSubmit={handleCreate} />
      <EditTaskModal
        open={openEditModal}
        task={editingTask}
        onClose={() => {
          setOpenEditModal(false)
          setEditingTask(null)
        }}
        onSubmit={handleUpdate}
      />
    </DashboardLayout>
  )
}
