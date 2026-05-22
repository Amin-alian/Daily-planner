import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useUiStore } from '../../store/uiStore'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginForm() {
  const navigate = useNavigate()
  const { login, loading } = useAuth()
  const addToast = useUiStore((state) => state.addToast)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!emailPattern.test(email)) {
      setError('Please provide a valid email address.')
      return
    }

    setError('')
    try {
      await login({ email, password })
      addToast({ type: 'success', message: 'Welcome back!' })
      navigate('/dashboard')
    } catch {
      setError('Login failed. Check your credentials and try again.')
      addToast({ type: 'error', message: 'Unable to login' })
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">Sign in</h2>
      <div>
        <label htmlFor="login-email" className="mb-1 block text-sm font-medium">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900"
          required
        />
      </div>
      <div>
        <label htmlFor="login-password" className="mb-1 block text-sm font-medium">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900"
          required
        />
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary py-2 font-semibold text-white transition duration-300 hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        New here?{' '}
        <Link to="/register" className="text-primary hover:underline">
          Create account
        </Link>
      </p>
    </form>
  )
}
