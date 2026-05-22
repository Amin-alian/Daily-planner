import { create } from 'zustand'
import client from '../api/client'
import type { AuthRequest, ApiResponse } from '../types'

interface AuthState {
  token: string | null
  email: string | null
  loading: boolean
  isAuthenticated: boolean
  initAuth: () => void
  register: (payload: AuthRequest) => Promise<void>
  login: (payload: AuthRequest) => Promise<void>
  logout: () => void
}

const TOKEN_KEY = 'planner_token'
let logoutTimer: number | undefined

const decodePayload = (token: string): { exp?: number; sub?: string } | null => {
  try {
    const payload = token.split('.')[1]
    if (!payload) return null
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
  } catch {
    return null
  }
}

const clearTimer = () => {
  if (logoutTimer) {
    window.clearTimeout(logoutTimer)
    logoutTimer = undefined
  }
}

const scheduleLogout = (token: string, logout: () => void) => {
  clearTimer()
  const payload = decodePayload(token)
  const expMs = payload?.exp ? payload.exp * 1000 : 0
  const remaining = expMs - Date.now()

  if (!payload?.exp || remaining <= 0) {
    logout()
    return
  }

  logoutTimer = window.setTimeout(() => logout(), remaining)
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  email: null,
  loading: false,
  isAuthenticated: false,
  initAuth: () => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) return

    const payload = decodePayload(token)
    if (!payload?.exp || payload.exp * 1000 <= Date.now()) {
      get().logout()
      return
    }

    scheduleLogout(token, get().logout)
    set({ token, isAuthenticated: true, email: payload.sub ?? null })
  },
  register: async (payload) => {
    set({ loading: true })
    try {
      const response = await client.post<ApiResponse<string>>('/auth/register', payload)
      const token = response.data.data
      localStorage.setItem(TOKEN_KEY, token)
      scheduleLogout(token, get().logout)
      const decoded = decodePayload(token)
      set({ token, isAuthenticated: true, email: decoded?.sub ?? payload.email })
    } finally {
      set({ loading: false })
    }
  },
  login: async (payload) => {
    set({ loading: true })
    try {
      const response = await client.post<ApiResponse<string>>('/auth/login', payload)
      const token = response.data.data
      localStorage.setItem(TOKEN_KEY, token)
      scheduleLogout(token, get().logout)
      const decoded = decodePayload(token)
      set({ token, isAuthenticated: true, email: decoded?.sub ?? payload.email })
    } finally {
      set({ loading: false })
    }
  },
  logout: () => {
    clearTimer()
    localStorage.removeItem(TOKEN_KEY)
    set({ token: null, email: null, isAuthenticated: false, loading: false })
  },
}))
