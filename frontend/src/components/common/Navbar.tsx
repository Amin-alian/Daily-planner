import { Moon, Sun } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useUiStore } from '../../store/uiStore'

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/analytics', label: 'Analytics' },
]

export default function Navbar() {
  const location = useLocation()
  const { isAuthenticated, logout } = useAuth()
  const darkMode = useUiStore((state) => state.darkMode)
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode)

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/dashboard" className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-lg font-bold text-transparent">
          Daily Planner
        </Link>

        {isAuthenticated && (
          <nav className="hidden items-center gap-4 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm transition-colors ${location.pathname === link.to ? 'text-primary' : 'text-gray-500 hover:text-primary dark:text-gray-300'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="rounded-lg border border-gray-200 p-2 transition hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          {isAuthenticated && (
            <button
              type="button"
              onClick={logout}
              className="rounded-lg bg-danger px-3 py-1.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
