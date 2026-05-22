import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, CircleAlert, Info, X } from 'lucide-react'
import { useUiStore } from '../../store/uiStore'

const iconByType = {
  success: CheckCircle2,
  error: CircleAlert,
  info: Info,
}

export default function Toast() {
  const toasts = useUiStore((state) => state.toasts)
  const removeToast = useUiStore((state) => state.removeToast)

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 w-full max-w-sm space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = iconByType[toast.type]
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="pointer-events-auto flex items-start gap-2 rounded-xl border border-gray-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-900"
            >
              <Icon className="mt-0.5 h-4 w-4 text-primary" />
              <p className="flex-1 text-sm">{toast.message}</p>
              <button type="button" onClick={() => removeToast(toast.id)}>
                <X className="h-4 w-4 text-gray-400" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
