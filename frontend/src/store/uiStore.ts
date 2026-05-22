import { create } from 'zustand'
import type { ToastMessage } from '../types'

interface UiState {
  darkMode: boolean
  toasts: ToastMessage[]
  toggleDarkMode: () => void
  initTheme: () => void
  addToast: (toast: Omit<ToastMessage, 'id'>) => void
  removeToast: (id: string) => void
}

const THEME_KEY = 'planner_theme'

export const useUiStore = create<UiState>((set, get) => ({
  darkMode: false,
  toasts: [],
  toggleDarkMode: () => {
    const next = !get().darkMode
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem(THEME_KEY, next ? 'dark' : 'light')
    set({ darkMode: next })
  },
  initTheme: () => {
    const stored = localStorage.getItem(THEME_KEY)
    const dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.classList.toggle('dark', dark)
    set({ darkMode: dark })
  },
  addToast: (toast) => {
    const id = crypto.randomUUID()
    set((state) => ({ toasts: [...state.toasts, { id, ...toast }] }))
    window.setTimeout(() => get().removeToast(id), 3000)
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}))
