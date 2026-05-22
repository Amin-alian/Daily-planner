import { Pencil, Trash2 } from 'lucide-react'
import type { TaskTemplate } from '../../types'

interface TaskTemplateCardProps {
  task: TaskTemplate
  onEdit: (task: TaskTemplate) => void
  onDelete: (task: TaskTemplate) => void
}

export default function TaskTemplateCard({ task, onEdit, onDelete }: TaskTemplateCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <p className="font-medium">{task.title}</p>
      <p className="mt-1 text-xs text-gray-500">{task.category || 'General'}</p>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => onEdit(task)} className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-2 py-1 text-xs dark:border-slate-700">
          <Pencil className="h-3.5 w-3.5" /> Edit
        </button>
        <button type="button" onClick={() => onDelete(task)} className="inline-flex items-center gap-1 rounded-lg border border-danger px-2 py-1 text-xs text-danger">
          <Trash2 className="h-3.5 w-3.5" /> Delete
        </button>
      </div>
    </div>
  )
}
