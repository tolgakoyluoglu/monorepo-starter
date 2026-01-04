import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './components/layouts/main-layout'
import { DashboardLayout } from './components/layouts/dashboard-layout'
import { HomePage } from './pages/home/home-page'
import { LoginPage } from './pages/login/login-page'
import { RegisterPage } from './pages/register/register-page'
import { DashboardPage } from './pages/dashboard/dashboard-page'
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password-page'
import { ResetPasswordPage } from './pages/reset-password/reset-password-page'
import { ProtectedRoute } from './components/protected-route'
import { GuestRoute } from './components/guest-route'

export const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}
