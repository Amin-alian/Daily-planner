import { create } from 'zustand'
import client from '../api/client'
import type { ApiResponse, DailyTask, ProgressData, TaskTemplate } from '../types'

interface TaskStore {
  templates: TaskTemplate[]
  todayTasks: DailyTask[]
  progress: ProgressData | null
  loading: boolean
  error: string | null
  fetchTemplates: () => Promise<void>
  fetchTodayTasks: () => Promise<void>
  createTemplate: (payload: { title: string; category: string }) => Promise<void>
  updateTemplate: (id: number, payload: { title: string; category: string }) => Promise<void>
  deleteTemplate: (id: number) => Promise<void>
  toggleTask: (templateId: number) => Promise<void>
  fetchProgress: (days: number) => Promise<void>
}

const normalizeTemplate = (task: {
  id: number
  title: string
  category?: string
  active?: boolean
  isActive?: boolean
  createdAt: string
}): TaskTemplate => ({
  ...task,
  category: task.category ?? 'General',
  active: task.active ?? task.isActive ?? true,
})

export const useTaskStore = create<TaskStore>((set) => ({
  templates: [],
  todayTasks: [],
  progress: null,
  loading: false,
  error: null,
  fetchTemplates: async () => {
    set({ loading: true, error: null })
    try {
      const response = await client.get<ApiResponse<TaskTemplate[]>>('/tasks')
      set({ templates: response.data.data.map(normalizeTemplate) })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch tasks' })
      throw error
    } finally {
      set({ loading: false })
    }
  },
  fetchTodayTasks: async () => {
    set({ loading: true, error: null })
    try {
      const response = await client.get<ApiResponse<DailyTask[]>>('/planner/today')
      set({ todayTasks: response.data.data })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch today tasks' })
      throw error
    } finally {
      set({ loading: false })
    }
  },
  createTemplate: async (payload) => {
    set({ loading: true, error: null })
    try {
      await client.post('/tasks', payload)
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create task' })
      throw error
    } finally {
      set({ loading: false })
    }
  },
  updateTemplate: async (id, payload) => {
    set({ loading: true, error: null })
    try {
      await client.put(`/tasks/${id}`, payload)
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update task' })
      throw error
    } finally {
      set({ loading: false })
    }
  },
  deleteTemplate: async (id) => {
    set({ loading: true, error: null })
    try {
      await client.delete(`/tasks/${id}`)
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete task' })
      throw error
    } finally {
      set({ loading: false })
    }
  },
  toggleTask: async (templateId) => {
    set({ loading: true, error: null })
    try {
      await client.post(`/planner/toggle/${templateId}`)
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to toggle task' })
      throw error
    } finally {
      set({ loading: false })
    }
  },
  fetchProgress: async (days) => {
    set({ loading: true, error: null })
    try {
      const response = await client.get<ApiResponse<ProgressData>>('/analytics/progress', { params: { days } })
      set({ progress: response.data.data })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch analytics' })
      throw error
    } finally {
      set({ loading: false })
    }
  },
}))
