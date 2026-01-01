import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { Header } from './header'

export function DashboardLayout() {
  return (
    <div className="min-h-screen lg:min-h-[98.5vh] flex flex-col lg:flex-row lg:gap-4">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 p-4 lg:mt-4 lg:mr-4 lg:p-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
