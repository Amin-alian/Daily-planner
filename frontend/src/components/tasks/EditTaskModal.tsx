import type { TaskTemplate } from '../../types'

interface EditTaskModalProps {
  open: boolean
  task: TaskTemplate | null
  onClose: () => void
  onSubmit: (id: number, payload: { title: string; category: string }) => Promise<void>
}

const categories = ['Work', 'Health', 'Learning', 'Personal', 'General']

export default function EditTaskModal({ open, task, onClose, onSubmit }: EditTaskModalProps) {
  if (!open || !task) return null

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    await onSubmit(task.id, {
      title: String(form.get('title') ?? ''),
      category: String(form.get('category') ?? 'General'),
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
      <form key={task.id} onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-white p-5 dark:bg-slate-900">
        <h3 className="text-lg font-semibold">Edit task</h3>
        <input
          name="title"
          defaultValue={task.title}
          className="mt-4 w-full rounded-xl border border-gray-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
          required
        />
        <select
          name="category"
          defaultValue={task.category || 'General'}
          className="mt-3 w-full rounded-xl border border-gray-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
        >
          {categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-xl border border-gray-300 px-3 py-2 text-sm dark:border-slate-700">Cancel</button>
          <button type="submit" className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white">Save</button>
        </div>
      </form>
    </div>
  )
}
