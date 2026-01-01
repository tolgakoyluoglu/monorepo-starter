import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
  const navigate = useNavigate()

  return (
    <section className="py-16 px-4 md:py-24 lg:py-32">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          Fullstack{' '}
          <span className="bg-linear-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Starter
          </span>
        </h1>
        <div className="mt-6 flex gap-4">
          <Button size="lg" onClick={() => navigate('/login')}>
            Sign in
          </Button>
          <Button size="lg" onClick={() => navigate('/register')}>
            Sign up
          </Button>
        </div>
      </div>
    </section>
  )
}
