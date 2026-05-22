import type { DailyTask } from '../../types'
import TaskCard from './TaskCard'

interface TaskListProps {
  tasks: DailyTask[]
  onToggle: (taskId: number) => void
}

export default function TaskList({ tasks, onToggle }: TaskListProps) {
  if (!tasks.length) {
    return <p className="rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-500 dark:border-slate-700">No tasks for today yet.</p>
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.taskId} task={task} onToggle={onToggle} />
      ))}
    </div>
  )
}
