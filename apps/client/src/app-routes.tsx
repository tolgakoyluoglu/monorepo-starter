import { Route, Routes } from 'react-router-dom'
import { GuestRoute } from './components/guest-route'
import { DashboardLayout } from './components/layouts/dashboard-layout'
import { MainLayout } from './components/layouts/main-layout'
import { ProtectedRoute } from './components/protected-route'
import { DashboardPage } from './pages/dashboard/dashboard-page'
import { HomePage } from './pages/home/home-page'
import { LoginPage } from './pages/login/login-page'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}
