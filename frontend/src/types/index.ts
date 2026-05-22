export interface ApiResponse<T> {
  success: boolean
  message: string
  timestamp: string
  data: T
}

export interface AuthRequest {
  email: string
  password: string
}

export interface TaskTemplate {
  id: number
  title: string
  category: string
  active: boolean
  createdAt: string
}

export interface DailyTask {
  taskId: number
  title: string
  category: string
  status: 'COMPLETED' | 'PENDING'
}

export interface ProgressData {
  period: string
  completionPercentage: number
  totalCompleted: number
  totalExpected: number
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
}
