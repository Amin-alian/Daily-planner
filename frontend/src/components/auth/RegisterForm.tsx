import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useUiStore } from '../../store/uiStore'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const passwordScore = (password: string) => {
  let score = 0
  if (password.length >= 8) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  return score
}

const strengthLabel = ['Weak', 'Fair', 'Good', 'Strong', 'Excellent']

export default function RegisterForm() {
  const navigate = useNavigate()
  const { register, loading } = useAuth()
  const addToast = useUiStore((state) => state.addToast)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const score = useMemo(() => passwordScore(password), [password])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!emailPattern.test(email)) {
      setError('Please provide a valid email address.')
      return
    }

    if (score < 2) {
      setError('Use a stronger password (8+ chars with numbers/symbols).')
      return
    }

    setError('')
    try {
      await register({ email, password })
      addToast({ type: 'success', message: 'Account created successfully' })
      navigate('/dashboard')
    } catch {
      setError('Registration failed. Please try again.')
      addToast({ type: 'error', message: 'Unable to register account' })
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">Create account</h2>
      <div>
        <label htmlFor="register-email" className="mb-1 block text-sm font-medium">Email</label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900"
          required
        />
      </div>
      <div>
        <label htmlFor="register-password" className="mb-1 block text-sm font-medium">Password</label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900"
          required
        />
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-danger via-primary to-secondary transition-all duration-300"
            style={{ width: `${Math.min((score / 4) * 100, 100)}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Strength: {strengthLabel[score]}</p>
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary py-2 font-semibold text-white transition duration-300 hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? 'Creating...' : 'Create account'}
      </button>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Already have an account?{' '}
        <Link to="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
