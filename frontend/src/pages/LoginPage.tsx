import { motion } from 'framer-motion'
import LoginForm from '../components/auth/LoginForm'
import Navbar from '../components/common/Navbar'
import Toast from '../components/common/Toast'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Navbar />
      <div className="mx-auto flex max-w-md px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <LoginForm />
        </motion.div>
      </div>
      <Toast />
    </div>
  )
}
