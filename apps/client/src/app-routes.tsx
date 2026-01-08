import { Route, Routes } from 'react-router-dom'
import { GuestRoute } from './components/guest-route'
import { DashboardLayout } from './components/layouts/dashboard-layout'
import { MainLayout } from './components/layouts/main-layout'
import { ProtectedRoute } from './components/protected-route'
import { DashboardPage } from './pages/dashboard/dashboard-page'
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password-page'
import { HomePage } from './pages/home/home-page'
import { LoginPage } from './pages/login/login-page'
import { RegisterPage } from './pages/register/register-page'
import { ResetPasswordPage } from './pages/reset-password/reset-password-page'

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
      <Route
        path="/register"
        element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <GuestRoute>
            <ForgotPasswordPage />
          </GuestRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <GuestRoute>
            <ResetPasswordPage />
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
