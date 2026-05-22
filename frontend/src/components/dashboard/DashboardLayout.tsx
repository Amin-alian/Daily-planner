import type { ReactNode } from 'react'
import Navbar from '../common/Navbar'
import Sidebar from '../common/Sidebar'
import Toast from '../common/Toast'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950">
      <Navbar />
      <div className="mx-auto flex max-w-6xl">
        <Sidebar />
        <main className="w-full p-4 md:p-6">{children}</main>
      </div>
      <Toast />
    </div>
  )
}
