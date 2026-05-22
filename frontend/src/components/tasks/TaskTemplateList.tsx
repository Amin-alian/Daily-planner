import type { TaskTemplate } from '../../types'
import TaskTemplateCard from './TaskTemplateCard'

interface TaskTemplateListProps {
  tasks: TaskTemplate[]
  onEdit: (task: TaskTemplate) => void
  onDelete: (task: TaskTemplate) => void
}

export default function TaskTemplateList({ tasks, onEdit, onDelete }: TaskTemplateListProps) {
  if (!tasks.length) {
    return <p className="rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-500 dark:border-slate-700">No active templates found.</p>
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskTemplateCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
