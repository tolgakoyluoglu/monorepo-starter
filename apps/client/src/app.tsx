import { BrowserRouter } from 'react-router-dom'
import { ScrollToTop } from './components/layouts/scroll-to-top'
import { AppRoutes } from './app-routes'

export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  )
}
