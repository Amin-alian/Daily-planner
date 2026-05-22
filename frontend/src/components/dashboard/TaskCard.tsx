import { CheckCircle2, Circle } from 'lucide-react'
import { motion } from 'framer-motion'
import type { DailyTask } from '../../types'

interface TaskCardProps {
  task: DailyTask
  onToggle: (taskId: number) => void
}

const categoryStyles: Record<string, string> = {
  work: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-200',
  health: 'bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-200',
  learning: 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-200',
}

export default function TaskCard({ task, onToggle }: TaskCardProps) {
  const categoryKey = task.category.toLowerCase()
  const categoryClass = categoryStyles[categoryKey] ?? 'bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-200'
  const isDone = task.status === 'COMPLETED'

  return (
    <motion.button
      whileTap={{ scale: 0.99 }}
      type="button"
      onClick={() => onToggle(task.taskId)}
      className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-card dark:border-slate-800 dark:bg-slate-900"
    >
      <div>
        <p className={`font-medium ${isDone ? 'line-through opacity-70' : ''}`}>{task.title}</p>
        <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${categoryClass}`}>
          {task.category || 'General'}
        </span>
      </div>
      {isDone ? <CheckCircle2 className="h-5 w-5 text-secondary" /> : <Circle className="h-5 w-5 text-gray-400" />}
    </motion.button>
  )
}
