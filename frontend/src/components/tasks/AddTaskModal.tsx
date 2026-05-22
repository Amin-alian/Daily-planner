import { useState } from 'react'

interface AddTaskModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (payload: { title: string; category: string }) => Promise<void>
}

const categories = ['Work', 'Health', 'Learning', 'Personal', 'General']

export default function AddTaskModal({ open, onClose, onSubmit }: AddTaskModalProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('General')

  if (!open) return null

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await onSubmit({ title, category })
    setTitle('')
    setCategory('General')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-white p-5 dark:bg-slate-900">
        <h3 className="text-lg font-semibold">Quick add task</h3>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Task title"
          className="mt-4 w-full rounded-xl border border-gray-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
          required
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
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
          <button type="submit" className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white">Add</button>
        </div>
      </form>
    </div>
  )
}
